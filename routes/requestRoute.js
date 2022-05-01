const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const Helper = require("../models/HelperModel")
const Request = require("../models/RequestModel")

let post;
let user;
let count =0;


router.route('/create').post((req,res)=>{
    const timeStamp = req.body.timeStamp
    const username = req.body.username
    const title = req.body.title;
    const desc = req.body.desc;
    const user_id = req.body.user_id
    let helpers = []



    const newRequest = new Request({
        timeStamp,
        user_id,
        username,
        title,
        desc,
        helpers
    });

    newRequest.save()
    .then(result=>{
        console.log("posted");
        res.end("done");
    })
    .catch(err=>{
        console.log(err);
    })
});

router.route('/requests').get((req, res)=>{
    Request.find()
    .then(foundposts=>{
        res.json(foundposts)
    })
    count =count +1;
    console.log(count)
})

router.route("/request").post((req,res)=>{
    Request.findById(req.body.id)
    .then(foundpost=>{
        res.send(foundpost)
    })

})




router.route("/help").post((req,res)=>{
    Request.findById(req.body.id)
    .then(res=>{
        post = res;
        post.helpers.push(req.body.user)
        // console.log(post);
        User.findById(post.user_id)
        .then(res=>{
            user = res;
            user.requestsResponded.push(req.body.id);
            // console.log(user)
            user.save()
            .then(res=>{
                // console.log("done")
            })
            .catch(err=>{
                console.log(err);
            })
    
        })
        post.save()
        .then(res=>{
            // console.log("done");
        })
        .catch(err=>{
            console.log(err);
        })

    })



    Helper.findById(req.body.user)
    .then(res=>{
        user = res;
        user.pendingRequests.push(req.body.id);
        // console.log(user)
        user.save()
        .then(res=>{
            // console.log("done")
        })
        .catch(err=>{
            console.log(err);
        })

    })
    .catch(err=>{
        console.log(err)
    })
});

router.route("/downvote").post((req,res)=>{
    Post.findById(req.body.id)
    .then(res=>{
        post = res;
        post.dislikedBy.push(req.body.user)
        // console.log(post);
        post.dislikes = post.dislikes + 1;
        post.save()
        .then(res=>{
            console.log("done");
    
        })
        .catch(err=>{
            console.log(err);
        })

    })

    User.findById(req.body.user)
    .then(res=>{
        console.log( "res", res)
        user = res;
        user.postsDisliked.push(req.body.id);
        // console.log(user)
        user.save()
        .then(res=>{
            // console.log("done")
        })
        .catch(err=>{
            console.log(err);
        })

    })
    .catch(err=>{
        console.log(err)
    })
});

router.route("/undownvote").post((req,res)=>{
    Post.findById(req.body.id)
    .then(res=>{
        post = res;
        post.dislikedBy = post.dislikedBy.filter(e=>{
            return e!==req.body.user
        })
        post.dislikes = post.dislikes - 1;
        // console.log(post);
        post.save()
        .then(res=>{
            // console.log("removed");
    
        })
        .catch(err=>{
            console.log(err);
        })

    })

    User.findById(req.body.user)
    .then(res=>{
        user = res;
        user.postsDisliked = user.postsDisliked.filter(e=>{
            return e!==req.body.id
        })
        console.log(user)
        user.save()
        .then(res=>{
            // console.log("removed")
        })
        .catch(err=>{
            console.log(err);
        })

    })
    .catch(err=>{
        console.log(err)
    })
});

router.route("/unhelp").post((req,res)=>{
    Request.findById(req.body.id)
    .then(res=>{
        post = res;
        // console.log(req.body.user)
        post.helpers = post.helpers.filter(e=>{
            return e!==req.body.user
        })
        User.findById(post.user_id)
        .then(res=>{
            user = res;
            // console.log(user)
            user.requestsResponded = user.requestsResponded.filter(e=>{
                return e!==req.body.id
            })
            // console.log(user)
            user.save()
            .then(res=>{
                // console.log("removed")
            })
            .catch(err=>{
                console.log(err);
            })
    
        })
         // console.log(post);
        .catch(err=>{
            console.log(err)
        })
        post.save()
        .then(res=>{
            // console.log("removed");
    
        })
        .catch(err=>{
            console.log(err);
        })
    })
    Helper.findById(req.body.user)
    .then(res=>{
        user = res;
        // console.log(user)
        user.pendingRequests = user.pendingRequests.filter(e=>{
            return e!==req.body.id
        })
        // console.log(user)
        user.save()
        .then(res=>{
            // console.log("removed")
        })
        .catch(err=>{
            console.log(err);
        })

    })
     // console.log(post);
    .catch(err=>{
        console.log(err)
    })


   
});

router.route("/delete").post((req,res)=>{
    Request.findByIdAndDelete(req.body.id)
    .then(res=>{
    console.log(res)
    })
    .catch(err=>{
        console.log(err);
    })


    User.findById(req.body.user)
    .then(res=>{
        user = res;
        // console.log(user)
        if(user.myRequests.includes(req.body.id)){
        user.myRequests = user.myRequests.filter(e=>{
            return e!==req.body.id
        })}
        // console.log(user)
        user.save()
        .then(res=>{
            // console.log("removed")
        })
        .catch(err=>{
            console.log(err);
        })

    })
    .catch(err=>{
        console.log(err)
    })
});

router.route("/comment").post((req,res)=>{
    console.log(req.body)
    Post.findById(req.body.id)
    .then(res=>{
        post=res;
        post.comments.push({user:req.body.user, comment:req.body.comment});
        post.nocomments = post.nocomments + 1;
        console.log(post)
        post.save()
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
        
    })
    .catch(err=>{
        console.log(err);
    })

});





module.exports = router;