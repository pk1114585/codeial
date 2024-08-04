{
    // method to submit the form data for new post using AJAX
    let createPost = function () {
        let newPostFrom = $('#new-post-form');


        newPostFrom.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'Post',
                url: '/post/create',
                data: newPostFrom.serialize(),
                success: function (data) {
                 let newPost=newPostFrom(data.data.post);
                 $('post-list-container>ul').prepend(newPost);
                 deletePost($(` .delete-post-button`, newPost));
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }
    // method to create a post in DOM
    let createPostDOM = function (post) {
        return $(`
            <li id="post-${post._id}">
                <p>
                    <small>
                        <a id="delete-post-button" href="/post/destroy/${post._id}">X</a>
                    </small>
                    ${post.content}
                    <br>
                    <small>
                        ${post.user.name}
                    </small>
                </p>
                <div class="post-comments">
                    <form action="/comment/create" method="post">
                        <input type="text" name="content" placeholder="Type here to add comment..." required>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Comment">
                    </form>
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                            <!-- Comments will be appended here -->
                        </ul>
                    </div>
                </div>
            </li>
        `);
    }

   //method to delete a post from Dom
   let deletePost=function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                $(`#post-${data.data.post._id}`).remove();
            }, error: function (error) {
                    console.log(error.responseText);
                }
        })
    })
   }


    createPost();
    
}