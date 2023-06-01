<template>
  <body>
    <header>
      <div class="title">Vue Firebase Example</div>
    </header>

    <main>
      <div class="container">
        <p>ID(メールアドレス)</p>
        <input type="email" v-model="inputValueId" />
        <!-- この下の<p></p>はテキストボックスを中央に配置するために必要な疑似要素です -->
        <p></p>
      </div>

      <div class="container">
        <p>パスワード</p>
        <input type="password" v-model="inputValuePassword" />
        <!-- この下の<p></p>はテキストボックスを中央に配置するために必要な疑似要素です -->
        <p></p>
      </div>

      <div class="message">
        <p class="red">{{ errorMessage }}&nbsp;</p>
      </div>

      <div>
        <button class="btn_standard" type="submit" v-on:click="logIn">ログインする</button>
      </div>
      <!-- ローディングアニメーション -->
      <div class="loading_animation_container">
        <div class="loading_animation" v-if="this.isLoading">
          <LoadingAnimationComponent></LoadingAnimationComponent>
        </div>
      </div>

      <div class="login_info_container">
        <div class="login_info">
          <p>LoginIDとパスワードは以下の通りです</p>
          <br>
          <p>ID: hoge_taro_9999@gmail.com</p>
          <p>Pass: hoge_taro_9999</p>
          <br>
          <p>ID: hoge_hanako_9999@gmail.com</p>
          <p>Pass: hoge_hanako_9999</p>
        </div>
      </div>

      <FooterComponent></FooterComponent>
    </main>

  </body>
</template>

<script>
import FooterComponent from '../components/FooterComponent.vue'
import LoadingAnimationComponent from '../components/LoadingAnimationComponent.vue'
// Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import Firebase from '../firebase_settings/index.js';
const auth = Firebase.auth;

export default{

  components: {
    FooterComponent,
    LoadingAnimationComponent,
  },

  methods: {
    //To Home
    goToHome() {
      this.$router.push('/');
    },

    // login
    logIn() {
      if(this.inputValueId === undefined || this.inputValueId === "" || this.inputValuePassword === undefined || this.inputValuePassword === "") {
        this.errorMessage = 'IDまたはパスワードが未入力です'
        return 
      }

      // エラーメッセージ消去
      this.errorMessage = ''

      // ローディングアニメーション
      this.isLoading = true;

      // id,passを取得
      const mId = this.inputValueId
        const mPass = this.inputValuePassword

      // 連続クリックを防ぐためにパスワード欄を空欄にする
      this.inputValuePassword = ""

      // サインインメソッド
      signInWithEmailAndPassword(auth, mId, mPass)
        // サインイン成功時
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("ログイン成功 "+user.email)
          this.goToHome()
        })

        // サインイン失敗時
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('ログインエラー: errorCode -> '+errorCode+', errorMessage -> '+errorMessage)
          this.JudgeErrorCode(errorCode)

          // ローディングアニメーション
          this.isLoading = false
        });
    },

    // Firebaseから受け取ったエラーコードを判定しエラーメッセージを表示する
    JudgeErrorCode(mError) {
      const errorCode = String(mError)
      if(errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-mail' || errorCode === 'auth/user-not-found') {
        this.errorMessage = "ログインに失敗しました。IDまたはパスワードが間違っています";
      } else {
        this.errorMessage = "ログインに失敗しました。予期せぬエラーが発生しました。"
      }
    },
  },

  data() {
    return {
      // ローディングアニメーション
      isLoading: false,

      // エラーメッセージ
      errorMessage: '',

      // 入力欄
      inputValueId: "",
      inputValuePassword: "",
    }
  },

  computed: {
    
  },
}
</script>

<style scoped>

</style>