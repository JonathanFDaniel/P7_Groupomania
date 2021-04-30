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
            <ul v-if="posts.length" class="list-group col-lg-8 d-flex flex-column-reverse">
                <li class="list-group-item mt-3" v-for="(post, index) in posts" :post="post" :index="index" :key="post.id">
                    <div class=row>
                        <div class="col-11 my-1">
                            <h6 class="font-weight-bold my-0">{{ post.user.firstname }} {{ post.user.lastname }}</h6>
                            <p class="my-0 text-muted"><small><em>{{ post.createdAt}}</em></small></p>
                        </div>
                        <div class="col-1">
                            <button type="submit" @click="deleteMessage" class="btn px-1"><span aria-hidden="true">&times;</span></button>
                        </div>
                    </div>
             
                    <div class="bg-light rounded text-dark my-2 p-2">
                        <div class="row" v-if="post.attachement === null">
                            <div class="col-sm-12">
                                <div class="d-flex justify-content-center preview-images mb-2">
                                    <img src="../assets/download.jpg" width="95%" height="auto" alt="photo">
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div>
                        <p class="font-weight-bold my-0"><small>{{ post.title }}</small></p>
                        <p class="my-0"><small>{{ post.content }}</small></p>
                    </div>

                    <div class="py-0">
                        <p>
                            <button type="button"  class="btn btn-outline-primary btn-sm" @click="like(post)" v-bind:class="{ active: isActive}">
                                like
                            </button> 
                            <span v-if="post.likes !== null"> {{ post.likes }}</span>
                        </p>   
                    </div>

                    <div class="my-2 p-2">
                        <ul class="list-group d-flex flex-column-reverse">
                            <li class="list-group-item d-flex justify-content-between" v-for="post in post.comment" :key="post.comment">
                               <span class="my-0"><small>{{ post.content }}</small></span>
                               <span class="my-0">lucie</span>
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
        image: '',
        comment: '', 
        posts: [],
        userValid: false,
        index: -1,
        messageId: '',
        isActive: false
    }
  },

  methods: {
    showMessage() {
        
        API.get('message/')
        .then(response => {
            this.posts = response.data;
            console.log(response.data);
        })    
        .catch(error => { console.log(error); 
        })
    },

    createMessage() {

        /* const image = document.getElementById('addImage').files[0] */
         
         this.$validator.validateAll().then(isValid => {
            if (isValid) { 
                    API.post('message/new', {
                    title: this.message.title,
                    content: this.message.content,
                    /* attachement: image */
                })  
                .then(response => {
                    this.message.title = "",
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

    deleteMessage() {
         
        API.delete('message')  
            .then(response => { 
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    },

    like(post) {

        const messageId = post.id

        API.post('like/' + messageId + '/likeMessage')
            .then(() => {
            console.log(API);
            this.showMessage();
            this.isActive = !this.isActive; 
            })
            .catch(messageId => {
                console.log(messageId);
            }) 

    },

    addComment(post) {

        const messageId = post.id

        API.post('comment/' + messageId, {
            content: this.comment
        })  
            .then(response => {
            console.log(response);
            this.showMessage(); 
            })
            .catch(messageId => {
                console.log(messageId);
            }) 
        } 
    },

    mounted() {
        this.showMessage();
    }
}
</script>