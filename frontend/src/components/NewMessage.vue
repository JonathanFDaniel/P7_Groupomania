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
            <ul class="list-group d-flex flex-column-reverse">
                <li class="list-group-item mt-3" v-for="post in posts" :key="post.posts">

                    <h5>{{ post.title }} </h5>

                    <p>{{ post.content }}</p>

                    <input v-model="comment" v-on:keyup.enter="addComment" type="text" class="form-control" placeholder="Ecrivez un commentaire">

                </li>
            </ul> 
        </div>

    </div>
</template>

<script>

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/talk/';

export default {
    
  name: 'NewMessage',
    data() {
    return {
        message: {
            title: '',
            content: '',
        },
        comment: '', 
        posts: []
    }
  },

  methods: {

    showMessage() {
        axios.get(API_URL + 'message')
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
                    axios.post(API_URL + 'message', {
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

    addComment() {
        console.log(this.comment);
        axios.post(API_URL + 'comment', {
            content: this.comment
        })  
            .then(response => {
            console.log(response);
            })
            .catch(error => {
                console.log(error);
            }) 
        }
    },

    mounted() {
        this.showMessage();
    }
}
</script>