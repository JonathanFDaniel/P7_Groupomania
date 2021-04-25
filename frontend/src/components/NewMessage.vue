<template>
    <div class="container mt-3">

        <h2>Publier un nouveau message</h2>

        <form name="form" @submit.prevent="createMessage" class="row py-3">  

            <div class="col-sm-2 form-group mt-2">
                <input v-model="message.title" type="string" class="form-control" id="messageTitle" placeholder="titre" required>
            </div>

            <div class="col-sm-8 form-group mt-2">
                <input v-model="message.content" type="text" class="form-control" id="messageContent" placeholder="contenu du message" required>
            </div>

            <div class="col-sm-2 d-flex justify-content-start mt-2">
                <button type="submit" class="btn btn-primary">Valider</button>
            </div>

        </form>

        <div class="mb-5">
            <ul v-if="posts.length" class="list-group d-flex flex-column-reverse">
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
                        <p class="my-0"><small>{{ post.title }}</small></p>
                        <p class="my-0"><small>{{ post.content }}</small></p>
                    </div>

                    <div class="my-2 p-2">
                        <ul class="list-group d-flex flex-column-reverse">
                            <li class="list-group-item d-flex justify-content-between" v-for="post in post.comment" :key="post.comment">
                               <span class="my-0"><small>{{ post.content }}</small></span>
                               <span class="my-0">lucie</span>
                            </li>
                        </ul>  
                    </div> 
                       
                    <input v-model="comment" v-on:keyup.enter="addComment(post, index)" type="text" class="form-control bg-light border border-secondary"  placeholder="Ecrivez un commentaire">

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
        },
        comment: '', 
        posts: [],
        userValid: false,
        index: -1,
        messageId: ''
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
         
        this.$validator.validateAll().then(isValid => {
            if (isValid) { 
                    API.post('message/new', {
                    title: this.message.title,
                    content: this.message.content,
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

    setActiveTutorial(post, index) {

        this.currentTutorial = post;
        this.currentIndex = index;
        console.log(post.id);

    },

    addComment(post) {

        this.messageId = post.id

        const messageId = new URLSearchParams();
        messageId.append('messageId', this.messageId);
 
        console.log(messageId.messageId)

        API.post('comment'/*, params  this.messageId  {
            params: {
                messageId: this.messageId
            }} */, {
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