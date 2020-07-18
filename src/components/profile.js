import Vue from 'vue'
import image from '../img/sableLuminoso.png'

export default Vue.component("profile", {
  data: () => ({
    image,
    name: 'Luis'
  }),
  template: `
  <div class="profile">
    <img :src="image" alt="ProfileImage">
    <h1>Hello {{ name }}</h1>
  </div>
  `
})

