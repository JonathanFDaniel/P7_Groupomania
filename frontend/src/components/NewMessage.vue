<template>
    <div class="container mt-3">

        <h2>Publier un nouveau message</h2>

        <form name="form" @submit.prevent="createMessage"> 

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

        <div class="row justify-content-center mb-5">
            <ul v-if="posts.length" class="list-group col-lg-8 d-flex">
                <li class="list-group-item mt-3" v-for="(post, index) in posts" :post="post" :index="index" :key="post.id">
                    <div class=row>
                        <div class="col-11 my-1">
                            <h6 class="font-weight-bold my-0">{{ post.user.firstname }} {{ post.user.lastname }}</h6>
                            <p class="my-0 text-muted"><small><em>{{ post.createdAt}}</em></small></p>
                        </div>
                        <div class="col-1">
                            <button type="submit" @click="deleteMessage(post)" class="btn px-1 py-0"><span aria-hidden="true">&times;</span></button>
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
                    </div>

                    <div class="py-0">
                        <p>
                            <button type="button"  class="btn btn-outline-primary btn-sm py-0" @click="like(post)">
                                like
                            </button> 
                            <span> {{ post.likes }}</span>
                        </p>   
                    </div>

                    <div class="my-2 p-2">
                        <ul class="list-group">
                            <li class="list-group-item d-flex row" v-for="postComment in post.comment" :key="postComment.comment">
                                <p class="col-9 my-0">{{ postComment.content }}</p>
                                <p class="col-2 my-0 font-weight-bold">{{ postComment.userComment }}</p>
                                <button type="submit" @click="deleteComment(post, postComment)" class="col-1 pt-0 btn"><span aria-hidden="true">&times;</span></button>                             
                            </li>
                        </ul>               
                    </div> 
                       
                    <input v-model="comment" v-on:keyup.enter="addComment(post)" type="text" class="form-control bg-light border border-secondary"  placeholder="Ecrivez un commentaire">
                    
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
            comment: '',
            imageFile: null,
            posts: [],
            userValid: false,
            index: -1,
            messageId: '',
            isActive: false
        }
    },
    mounted() {
        this.showMessage();
    },

    methods: {
        
        showMessage() {
            
            API.get('message')
            .then(response => {
                const responseData = response.data;
                responseData.forEach(element => {
                    const elements = element 
                    const date = element.createdAt.split('T')[0];
                    const hour = element.createdAt.split('T')[1];
                    const years = date.split('-')[0];
                    const months = date.split('-')[1];
                    const days = date.split('-')[2];
                    const hours = hour.split(':')[0];
                    const minutes = hour.split(':')[1];
                    const dates = {'date' :`publié le ${days}/${months}/${years} à ${hours}h${minutes}`};
                    //elements.forEach(elementUnique => {
                    // const ele = elementUnique
                        //this.elementUnique.push(dates);
                        //console.log(ele);
                    //})
                    //this.elements.push(dates);
                    console.log(elements, dates)
                }); 
                this.posts = response.data;
            })    
            .catch(error => { console.log(error); 
            })
        },

        createMessage() {

            this.imageFile = document.getElementById('addImage').files[0] 

            const fd = new FormData();
                fd.append('title', this.message.title)
                fd.append('content', this.message.content)   
                fd.append('image', this.imageFile )  
                for (var value of fd.values()) {
                    console.log(value);
                } 
                this.$validator.validateAll().then(isValid => {
                    if (isValid) {
                        API.post('message/new', fd, {
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
                        }) 
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
                })
        },

        like(post) {

            const messageId = post.id;

            API.post('like/' + messageId + '/likeMessage')
                .then(response => {
                console.log(response);
                this.showMessage();
                })
                .catch(messageId => {
                    console.log(messageId);
                }) 

        },

        addComment(post) {

        console.log('ok', post.index)
            const messageId = post.id;

            API.post('comment/' + messageId, {
                content: this.comment
            })  
                .then(response => {
                console.log(response);
                this.comment = '';
                this.showMessage(); 
                })
                .catch(messageId => {
                    console.log(messageId);
                }) 
        },

        deleteComment(post, postComment) {

            const messageId = post.id;
            const commentId = postComment.id;
                
            API.delete('comment/' + messageId + '/' + commentId)  
                .then(response => { 
                    console.log(response);
                    this.showMessage();
                })
                .catch(error => {
                    console.log(error);
                }) 
            }
        } 
    }
</script>