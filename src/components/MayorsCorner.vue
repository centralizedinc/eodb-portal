<template>
  <a-row type="flex" :gutter="16">
    <a-col :span="24">
      <template v-if="loading">
        <a-card>
          <div v-for="i in 4" :key="i">
            <a-skeleton active avatar :paragraph="{rows: 4}" />
            <a-divider></a-divider>
          </div>
        </a-card>
      </template>

      <template v-else>
        <a-card
          style="margin-bottom: 2vh; box-shadow: 0px 0px 10px 2px #88888847"
          v-for="(item, index) in posts"
          :key="index"
        >
          <a-comment>
            <template slot="actions">
              <span>
                <a-tooltip title="Like">
                  <a-icon
                    type="like"
                    :theme="action === 'liked' ? 'filled' : 'outlined'"
                    @click="like"
                  />
                </a-tooltip>
                <span style="padding-left: '8px';cursor: 'auto'">{{item.likes}}</span>
              </span>
              <span>
                <a-tooltip title="Dislike">
                  <a-icon
                    type="dislike"
                    :theme="action === 'disliked' ? 'filled' : 'outlined'"
                    @click="dislike"
                  />
                </a-tooltip>
                <span style="padding-left: '8px';cursor: 'auto'">{{item.dislikes}}</span>
              </span>
            </template>
            <a
              slot="author"
            >{{constant_helper.client_details.title}} {{constant_helper.client_details.name}}</a>
            <a-avatar :src="constant_helper.client_details.avatar" slot="avatar" />
            <span slot="content">
              <p>{{item.message}}</p>
              <a-row type="flex" justify="center" :gutter="16">
                <a-col
                  :span="8"
                  v-for="(image, index) in item.attachments"
                  :key="index"
                  style="border: 1px solid #00000010; margin-right:1vw; margin-left: 1vw"
                >
                  <img :src="image" width="100%" margin/>
                </a-col>
                 <a-col
                  :span="18"
                  v-for="(link, index) in item.videos"
                  :key="index"
                >
                  <!-- <video width="100%"> -->
                    <iframe width="100%" height="315" :src="link" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  <!-- </video> -->
                </a-col>
              </a-row>
            </span>
            <a-tooltip slot="datetime" :title="formatDate(moment(item.date))">
              <span>{{moment(item.date).fromNow()}}</span>
            </a-tooltip>
          </a-comment>
        </a-card>
        <!-- 
        <a-card style="margin-bottom: 2vh">
          <a-comment>
            <template slot="actions">
              <span>
                <a-tooltip title="Like">
                  <a-icon
                    type="like"
                    :theme="action === 'liked' ? 'filled' : 'outlined'"
                    @click="like"
                  />
                </a-tooltip>
                <span style="padding-left: '8px';cursor: 'auto'">{{likes}}</span>
              </span>
              <span>
                <a-tooltip title="Dislike">
                  <a-icon
                    type="dislike"
                    :theme="action === 'disliked' ? 'filled' : 'outlined'"
                    @click="dislike"
                  />
                </a-tooltip>
                <span style="padding-left: '8px';cursor: 'auto'">{{dislikes}}</span>
              </span>
            </template>
            <a slot="author">{{constant_helper.client_details.title}} {{constant_helper.client_details.name}}</a>
            <a-avatar
              :src="constant_helper.client_details.avatar"
              slot="avatar"
            />
            <span slot="content">
              INGAT PO TAYO AT MAGING ALERTO:
              <br />
              <br />NDRRMC (4:30PM, 13Sept2019)
              <br />
              <br />Isang MLv5.5 Magnitude na lindol ang naganap sa Burdeos, Quezon kaninang 4:28PM. Damages at aftershocks ay inaasahan. Maging handa at siguraduhin ligtas ang sarili at pamilya.
              <a-row type="flex" justify="start" :gutter="8">
                <a-col :span="8">
                  <img
                    src="https://i.postimg.cc/8PGxP99m/Screen-Shot-2019-09-19-at-12-25-23-PM.png"
                    width="200vw"
                  />
                </a-col>
              </a-row>
            </span>
            <a-tooltip slot="datetime" :title="formatDate(moment().format('YYYY-MM-DD HH:mm:ss'))">
              <span>{{moment().fromNow()}}</span>
            </a-tooltip>
          </a-comment>
        </a-card>

        <a-card style="margin-bottom: 2vh">
          <a-comment>
            <template slot="actions">
              <span>
                <a-tooltip title="Like">
                  <a-icon
                    type="like"
                    :theme="action === 'liked' ? 'filled' : 'outlined'"
                    @click="like"
                  />
                </a-tooltip>
                <span style="padding-left: '8px';cursor: 'auto'">{{likes}}</span>
              </span>
              <span>
                <a-tooltip title="Dislike">
                  <a-icon
                    type="dislike"
                    :theme="action === 'disliked' ? 'filled' : 'outlined'"
                    @click="dislike"
                  />
                </a-tooltip>
                <span style="padding-left: '8px';cursor: 'auto'">{{dislikes}}</span>
              </span>
            </template>
            <a slot="author">{{constant_helper.client_details.title}} {{constant_helper.client_details.name}}</a>
            <a-avatar :src="constant_helper.client_details.avatar" alt slot="avatar" />
            <span slot="content">
              PAALALA SA LAHAT:
              <br />
              <br />Habang hinihihintay ng lokal na pamahalaan ang resulta ng pagsusuri ng BFAR kaugnay ng nangyaring fish kill, pinagbabawalan ang lahat na manghuli at kumain ng anumang uri ng isda mula sa Iyam river.
              <br />
              <br />Pinapayuhan din ang lahat na huwag munang maligo at magsagawa ng anumang gawain na makakaapekto sa kalusugan ng tao at lahat ng may buhay.
              <br />
              <br />Maraming salamat po!
              <a-row type="flex" justify="start" :gutter="8">
                <a-col :span="8">
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/18/19/11/fish-995050_960_720.png"
                    width="200vw"
                  />
                </a-col>
                <a-col :span="8">
                  <img src="https://image.flaticon.com/icons/svg/1661/1661940.svg" width="200vw" />
                </a-col>
              </a-row>
            </span>
            <a-tooltip slot="datetime" :title="moment().format('YYYY-MM-DD HH:mm:ss')">
              <span>{{moment().fromNow()}}</span>
            </a-tooltip>
          </a-comment>
        </a-card>

        <a-card style="margin-bottom: 2vh">
          <a-comment>
            <template slot="actions">
              <span>
                <a-tooltip title="Like">
                  <a-icon
                    type="like"
                    :theme="action === 'liked' ? 'filled' : 'outlined'"
                    @click="like"
                  />
                </a-tooltip>
                <span style="padding-left: '8px';cursor: 'auto'">{{likes}}</span>
              </span>
              <span>
                <a-tooltip title="Dislike">
                  <a-icon
                    type="dislike"
                    :theme="action === 'disliked' ? 'filled' : 'outlined'"
                    @click="dislike"
                  />
                </a-tooltip>
                <span style="padding-left: '8px';cursor: 'auto'">{{dislikes}}</span>
              </span>
            </template>
            <a slot="author">{{constant_helper.client_details.title}} {{constant_helper.client_details.name}}</a>
            <a-avatar
              :src="constant_helper.client_details.avatar"
              slot="avatar"
            />
            <span slot="content">
              PABATID: Ang Northern Quezon kasama po ang ating lungsod ay nananatiling na signal no. 1 ayon sa latest weather bulletin ng PAGASA kaya sa bisa pa din po ng E.O. No. 26 series of 2012 ay nananatiling sa mga pre-elementary or nursery at kinder lang po ang walang pasok bukas, Agosto 28, 2019.
              <br />
              <br />Mag-ingat po at manatiling handa ang bawat pamilyang Lucenahin!
              <a-row type="flex" justify="start" :gutter="8">
                <a-col :span="8">
                  <img
                    src="https://i2.wp.com/outoftownblog.com/wp-content/uploads/2018/07/Guidelines-on-the-Suspension-of-Classes-When-Typhoons-and-Other-Calamities-Occur.jpg?resize=600%2C450&ssl=1"
                    width="450vw"
                  />
                </a-col>
              </a-row>
            </span>
            <a-tooltip slot="datetime" :title="moment().format('YYYY-MM-DD HH:mm:ss')">
              <span>{{moment().fromNow()}}</span>
            </a-tooltip>
          </a-comment>
        </a-card>-->
      </template>
    </a-col>
  </a-row>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      subscribers: [],
      moment,
      likes: 845,
      dislikes: 0,
      action: null,
      loading: false
    };
  },
  created() {
    this.init();
  },
  computed: {
    posts() {
      return this.$store.state.mayor_corner.apps[this.constant_helper.app_index].posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  methods: {
    init() {
      this.loading = true;
      this.$http
        .get("https://randomuser.me/api/?results=20")
        .then(results => {
          console.log("::::", JSON.stringify(results));
          this.subscribers = results.data.results;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
          // this.$notification.error({

          // })
        });
    }
  }
};
</script>

<style>
.ant-skeleton-content .ant-skeleton-title {
  height: 9px;
}

.ant-skeleton-content .ant-skeleton-paragraph > li {
  height: 9px;
}
</style>