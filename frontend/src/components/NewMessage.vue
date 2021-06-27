<template>
    <div class="container mt-3">

<!-- message form  -->

        <h2>Publier un nouveau message</h2>

        <form name="form" @submit.prevent="createMessage($store.state.user.id)"> 

            <div class="row py-3">
                <div class="col-sm-4 form-group mt-2">
                    <input v-model="message.title" type="string" class="form-control" id="messageTitle" placeholder="Titre" required>
                </div>

                <div class="col-sm-8 form-group mt-2">
                    <input v-model="message.content" type="text" class="form-control" id="messageContent" placeholder="Contenu du message" required>
                </div>
            </div>

            <div class="row">
                <div class="form-group">
                    <label for="addImage" class="text-secondary">Image</label>
                    <input type="file" name="file" class="form-control-file mx-sm-2" id="addImage">
                </div>
            </div>

            <div class="d-flex justify-content-end mt-2">
                <button type="submit" class="btn btn-primary">Valider</button>
            </div>
        </form>

        <hr>

<!-- message list  -->

        <div class="row justify-content-center mb-5">
            <ul v-if="posts.length" class="list-group col-lg-8 d-flex">
                <li class="list-group-item mt-3" v-for="post in posts" :post="post" :key="post.id">
                    <div class=row>
                        <div class="col-11 my-1">
                            <h6 class="font-weight-bold my-0">{{ post.user.firstname }} {{ post.user.lastname }}</h6>
                            <p class="my-0 text-muted"><small><em>{{ post.dateTime }}</em></small></p>
                        </div>
                        <div class="col-1">
                            <button type="submit" v-if="$store.state.user.id == post.userId" @click="deleteMessage(post)" class="btn px-1 py-0"><span aria-hidden="true">&times;</span></button>
                        </div>
                    </div>
             
                    <div class="bg-light rounded text-dark py-2">
                        <div class="row" v-if="post.attachement !== null">
                            <div class="col-sm-12">
                                <div class="d-flex justify-content-center preview-images">
                                    <img :src="post.attachement" width="95%" height="auto" :alt="post.attachement">
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div class="mb-2">
                        <h6 class="my-0">{{ post.title }}</h6>
                        <p class="my-0">{{ post.content }}</p>
                        <div v-if="post.alert" class="alert alert-warning" role="alert">
                            Ce message est signalé comme abusif !
                        </div>
                    </div>

                    <div class="py-0">
                        <button type="button" class="btn btn-outline-primary btn-sm" @click="like(post, $store.state.user.id)">
                            like
                        </button> 

                        <span> {{ post.likes }}</span>

                        <button type="button" v-if="$store.state.user.isAdmin == true" class="btn btn-outline-warning btn-sm mx-1" @click="alert(post, 1, $store.state.user.id, 1)">
                            signaler
                        </button>

                        <button type="button" v-if="$store.state.user.isAdmin == true" class="btn btn-outline-danger btn-sm mx-1" @click="adminDeleteMessage(post)">
                            supprimer
                        </button>
                    </div>

<!-- comment list  -->

                    <div class="my-2 p-2">
                        <ul class="list-group">
                            <li class="list-group-item d-flex row" v-for="postComment in post.comment" :key="postComment.comment">
                           
                                <p class="col-9 my-0">{{ postComment.content }}</p>
                                <p class="col-2 my-0 font-weight-bold">{{ postComment.userComment }}</p>
                                <button type="submit" v-if="$store.state.user.id == postComment.userId" @click="deleteComment(post, $store.state.user.id, postComment)" class="col-1 pt-0 btn"><span aria-hidden="true">&times;</span></button> 
                                <div v-if="postComment.alert" class="alert alert-warning" role="alert">
                                    Ce commentaire est signalé comme abusif !
                                </div>  
                                <div>
                                    <button type="button" v-if="$store.state.user.isAdmin == true" class="btn btn-outline-warning btn-sm mx-1" @click="alert(post, postComment, $store.state.user.id, 2)">
                                        signaler
                                    </button>
                                    <button type="button" v-if="$store.state.user.isAdmin == true" class="btn btn-outline-danger btn-sm mx-1" @click="adminDeleteComment(post, $store.state.user.id, postComment)">
                                        supprimer
                                    </button>
                                </div>                          
                            </li>
                        </ul>               
                    </div> 
                       
                    <input v-model="post.newComment" v-on:keyup.enter="addComment(post, $store.state.user.id)" type="text" class="form-control bg-light border border-secondary"  placeholder="Ecrivez un commentaire">
                    
                </li>
            </ul> 
        </div>

    </div>
</template>

<script>

    import API from '@/axios';

export default {
        
    name: 'NewMessage',
    data() {
        return {
            message: {
                title: '',
                content: '',
                attachement: '',
            },
            imageFile: null,
            posts: [],
            userValid: false,
            messageId: '',
            isActive: false
        }
    },
    mounted() {
     /*    if($store.state.userValid == null) {
            this.$router.push('/signin');
        } */
        this.showMessage();
    },

    methods: {
        
        showMessage() {
            
            API.get('message')
            .then(response => {
                const responseData = response.data;
                this.posts = response.data;
                responseData.forEach((element, index) => {
                    
                    const date = element.createdAt.split('T')[0];
                    const hour = element.createdAt.split('T')[1];
                    const years = date.split('-')[0];
                    const months = date.split('-')[1];
                    const days = date.split('-')[2];
                    const hours = hour.split(':')[0];
                    const minutes = hour.split(':')[1];
                    this.posts[index].dateTime = `publié le ${days}/${months}/${years} à ${hours}h${minutes}`;
                });
               console.log(this.posts); 
            })    
            .catch(error => { console.log('ok', error); 
            });
        },

        createMessage(userId) {

            this.imageFile = document.getElementById('addImage').files[0] 

            const fd = new FormData();
                fd.append('title', this.message.title)
                fd.append('content', this.message.content)   
                fd.append('image', this.imageFile )  
                
                this.$validator.validateAll().then(isValid => {
                    if (isValid) {
                        API.post('message/new/' + userId, fd, {
                                headers: { "Content-Type": "multipart/form-data" },
                            }  
                        )  
                        .then(response => {
                            this.message.title = ""
                            this.message.content = "" 
                            this.showMessage(); 
                            console.log(response);
                        })
                        .catch(error => {
                            console.log(error);
                        }); 
                    }
                }) 
        },

        deleteMessage(post) {

            const messageId = post.id;
            
            API.delete('message/' + messageId)  
                .then(response => { 
                    console.log(response);
                    this.showMessage();
                })
                .catch(error => {
                    console.log(error);
                });
        },

        adminDeleteMessage(post) {

            const messageId = post.id;
            
            API.delete('message/adminDeleteMessage/' + messageId)  
                .then(response => { 
                    console.log(response);
                    this.showMessage();
                })
                .catch(error => {
                    console.log(error);
                });
        },

        like(post, userId) {

            const messageId = post.id;

            API.post('like/' + userId + '/' + messageId)
                .then(response => {
                console.log(response);
                this.showMessage();
                })
                .catch(messageId => {
                    console.log(messageId);
                }); 

        },

        alert(post, postComment, userId, type) {

            const messageId = post.id;
            const commentId = postComment.id;

            API.post('alert/' + userId + '/' + messageId + '/' + type + '/' + commentId)
                .then(response => {
                console.log(response);
                this.showMessage();
                })
                .catch(messageId => {
                    console.log(messageId);
                }); 

        },
        
        addComment(post, userId) {

            const messageId = post.id;

            API.post('comment/' + userId + '/' + messageId, {
                content: post.newComment
            })  
                .then(response => {
                console.log(response);
                post.newComment = '';
                this.showMessage(); 
                })
                .catch(messageId => {
                    console.log(messageId);
                });
        },

        deleteComment(post, userId, postComment) {

            const messageId = post.id;
            const commentId = postComment.id;
                
            API.delete('comment/' + userId + '/' + messageId + '/' + commentId)  
                .then(response => { 
                    console.log(response);
                    this.showMessage();
                })
                .catch(error => {
                    console.log(error);
                }); 
        }, 

        adminDeleteComment(post, userId, postComment) {

            const messageId = post.id;
            const commentId = postComment.id;
                
            API.delete('comment/adminDeleteComment/' + userId + '/' + messageId + '/' + commentId)  
                .then(response => { 
                    console.log(response);
                    this.showMessage();
                })
                .catch(error => {
                    console.log(error);
                });  
        }
    }
}
</script>