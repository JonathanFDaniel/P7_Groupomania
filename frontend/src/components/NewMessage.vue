<template>
    <div class="container mt-3">

        <h2>Publier un nouveau message</h2>

        <form class="row py-3">  

            <div class="col-sm-2 form-group mt-2">
                <input v-model="title" type="string" class="form-control" id="messageTitle" placeholder="titre">
            </div>

            <div class="col-sm-8 form-group mt-2">
                <input v-model="content" type="text" class="form-control" id="messageContent" placeholder="contenu du message">
            </div>

            <div class="col-sm-2 d-flex justify-content-start mt-2">
                <button type="submit" v-on:click="createMessage" class="btn btn-primary">Valider</button>
            </div>

        </form>

        <button type="submit" v-on:click="showMessage()" class="btn btn-danger mb-5">Valider</button> 

        <div class="mb-5">
            <ul class="list-group d-flex flex-column-reverse">
                <li class="list-group-item mt-3" v-for="post in posts" :key="post.posts">

                    <h5>{{ post.title }} </h5>

                    <p>{{ post.content }}</p>

                  
                    <input v-on:keyup.enter="addComment()" type="string" class="form-control" id="comment" placeholder="Ecrivez un commentaire">
  

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
        title: '',
        content: '',
        comment: '', 
        posts: []
    }
  },

  methods: {

    createMessage() {
        axios.post(API_URL + 'message', {
            title: this.title,
            content: this.content,
        })  
        .then(response => {
        console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    },

    showMessage() {
        axios.get(API_URL + 'message')
        .then(response => this.posts = response.data)
        .catch(error => { console.log(error); })
    },

    addComment() {
        console.log(this.comment);
/*         axios.post(API_URL + 'message', {
            comment: this.comment
        })  
        .then(response => {
        console.log(response);
        })
        .catch(error => {
            console.log(error);
        }) */
    }
  },
/*       mounted: function() {
        showMessage() {
            axios.get(API_URL + 'message')
            .then(response => this.posts = response.data)
            .catch(error => { console.log(error); })
        }
    }, */
}
</script>