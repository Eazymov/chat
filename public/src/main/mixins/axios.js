import Axios from 'axios';

const { post, get } = Axios;

export default {
  data: () => ({
    Axios,
    post,
    get
  })
}
