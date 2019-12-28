/* eslint-disable no-console */

import { register } from 'register-service-worker'
import axios from 'axios'

/**
 * Global PWA variables
 */

const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

window.eodb_pwa = {
  applicationServerKey: urlB64ToUint8Array('BPkZHUsQThs4Qry2t-4iDqHyneZ-_O09bbToP8vId38cToT8Wod9MOCwmQgefAdMtUfEhMPPankmtMdX-tCq4hU'),
  isSubscribed: false,
  subscription: {},
  registration: {},

   /**
   * 
   * @param {*} registration 
   */
  checkSubscription(registration) {
    console.log('checkSubscription:', JSON.stringify(registration))
    registration.pushManager.getSubscription()
      .then((subscription) => {
        console.log("subsription", JSON.stringify(subscription))
        this.subscription = subscription;
        this.registration = registration;
        this.isSubscribed = !(subscription === null)
        console.log('this.registration :', this.registration);
      })
      .catch(error => {
        console.log('checkSubscription error :', error);
      })
  },
  /**
   * 
   * @param {String} account_id 
   */
  askPermission(account_id) {
    var _self = this

    _self.getSubscriptionByAccountId(account_id)
      .then((result) => {
        if (result.data.model && result.data.model.length) {
          var subscriptions = result.data.model
          console.log('subscriptions :', subscriptions);
          if (Notification.permission === 'granted') {
            _self.checkLocalSubscription(account_id, subscriptions, _self)
          } else {
            Notification.requestPermission(result => {
              console.log('result from permission question', result);
              if (Notification.permission === 'granted') {
                _self.checkLocalSubscription(account_id, subscriptions, _self)
              }
            })
          }
        }else{
          Notification.requestPermission(result => {
            console.log('result from permission question', result);
            if (Notification.permission === 'granted') {
              _self.checkLocalSubscription(account_id, subscriptions, _self)
            }
          })
        }
      }).catch((err) => {
        console.log('getSubscriptionByAccountId error :', err);
        reject()
      });
  },

  checkLocalSubscription(account_id, subscriptions, _self) {
    if (_self.subscription) {
      var isExist = false
      subscriptions.forEach(sub => {
        if (sub.subscription.endpoint === _self.subscription.endpoint) isExist = true
      });
      if (!isExist) {
        _self.saveSubscription(account_id, _self)
          .then((result) => {
            _self.isSubscribed = true
            console.log('Done saving subscription :', result);
          }).catch((err) => {
            console.log('err :', err);
          });
      } else console.log('Subscription already exist.');
    } else {
      _self.subscribe(account_id, _self)
        .then((result) => {
          console.log('Done saving subscription :', result);
        }).catch((err) => {
          console.log('err :', err);
        });
    }
  },

  saveSubscription(account_id, _self) {
    var details = {
      subscription: this.subscription,
      account_id
    }
    return axios.post(process.env.VUE_APP_BASE_API_URI + '/subscriptions/', details)
  },

  getSubscriptionByAccountId(account_id) {
    return axios.get(process.env.VUE_APP_BASE_API_URI + `/subscriptions/${account_id}`)
  },

  /**
   * 
   * @param {String} account_id 
   */
  subscribe(account_id, _self) {
    const options = {
      applicationServerKey: _self.applicationServerKey,
      userVisibleOnly: true
    }
    return new Promise((resolve, reject) => {
      _self.registration.pushManager.subscribe(options)
        .then(subscription => {
          _self.subscription = subscription
          return _self.saveSubscription(account_id, _self);
        })
        .then(result => {
          _self.isSubscribed = true
          _self.sendWelcomeNofitication()
          resolve()
        })
        .catch(error => {
          console.error('error: ', error)
          reject(error)
        })
    })
  },
  /**
   * 
   */
  sendWelcomeNofitication() {
    this.registration.showNotification('SmartJuan24', {
      body: 'You are now subscribed to SmartJuan24 Notifications',
      icon: '/smartjuan-logo.png'
    });
  },

  setSubscription(account_id, isSubscribe) {
    this.isSubscribed = isSubscribe
    if (!isSubscribe) {
      return axios.get(process.env.VUE_APP_BASE_API_URI + `/subscriptions/remove/${account_id}`)
    } else if (this.subscription) {
      return this.saveSubscription(account_id, this)
    } else {
      return this.subscribe(account_id, this)
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {},
    registered(registration) {
      //check for updates every 1hr
      setInterval(() => {
        registration.update()
      }, 1000 * 60 * 60);
      //check permission
      console.log('registered:', JSON.stringify(registration))
      window.eodb_pwa.checkSubscription(registration)
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated (registration) {
      console.log('New content is available; please refresh:', JSON.stringify(registration))
      document.dispatchEvent(new CustomEvent('swUpdated', {
        detail: registration
      }));
    },
    offline (registration) {
      console.log('Offline:', JSON.stringify(registration))
      document.dispatchEvent(new CustomEvent('swoffline', {
        detail: registration
      }));
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
