// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Either paste it directly…
const firebaseConfig = {
  "type": "service_account",
  "project_id": "video-processor-d7410",
  "private_key_id": "7a00376d475d58cb176236eaf2d716f9fa7faa14",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDGpEJTe01Rcw/H\n/e3iwp4szsotOsMe2S7V1X/bVlN9lj+hwCN+UOJhh6yLD/bF2M5Wj2tpb+xilB55\nZI2yxnRwuMST7HleSba4N4gZyWuz47mP0jLzZADgF3A+/1RGNFUJPQPt6HmuIwwg\nVqXBqWkqrdytc5DOaM9Gx6Y0aYh+ut1MIEcrtQoBv5IHpUhChcjVgsaAY83sOvy7\n4jS4UBom5lQOTUiKwSTFuw+R3ordJ8IUxt/aHJjiHweFOrVYDO5izbtG5I+8fVYV\nmy7Ypj1vTEKqis+XeUMQvhpB889jueYq+QWz6uJLu+oRtQgcSOb8j1DNuKAOBAQr\n589PcckXAgMBAAECggEANmYKYelM+ca8ZiUErgplHdk9pdhHUh3hBR9UReFkuOpa\nH7ZKIhANhu8MUgL7rh/bFfptzHChuDdfBxiB85kEj1ASSX5DmI4wU0+l3oX6EEgH\na7sBSAU1dikFDMOItTckqISEnHUDSayAaCTCfQAjdFQrsHaLC/PI+9W2Dvltr2KK\neq8mtNxt7GIdiYWVf4jc9/moDQiH46XhTiQYqPkEt6M3AenoyPrE2/AsudTWd/t9\n5J2zqR7666gBp4Obflp+ly1m0wZS4SsmpmMNzjfmcnWoY/KFCFTS7bktjsHexkgk\nf1TVhwXCwQqdSXZzs3A2Ts0DAS4dRW8lb9pWxPUSvQKBgQDu+4aRvElNFgWU9ryP\n0In0am8oSCs9XAZH8QNT+ZoJuCyPdUjfkWLJWl8iMJsv1QIaP/a/IwbwTS1FiILz\nE20P5GjqmzESuszyiZyszR7KivHQ1NW7MjNqjXybrsdhIGC1B6HKd2eT1IBG2T1V\niLX3uxn8E0e4VR/LhPrCgtR2GwKBgQDUyVlWcB/+NYFvAOdAQ4HLqZ8pId5N5+kJ\njD1UI2lHgL+8PL7oH5hI6LsB8O9Adfx6SuFluA1y+CLT+TvT13au4O2tLvDCiviE\nN7TRfZu1TJspanV8FNr94h2qtUWy2Tg3le58rHkC3sweSaqU2FdSkxQY5Vvzyeqi\nfVmhsfNYtQKBgQDAlnZVz5SKyKpq54QBqZ7jFzrJDY+6/QQaycFS1R0ro/5VBcFa\nWcFwXqG33c/R9iihmtZwJfwbfzZyiJZu6ULEwd9C4Rnk7CDpe7iFETA1LU++aSZs\nmwIQZkD6/RizzvHgMWxSy3LvERrm/X6OBYQPRfqkx6zOgdsDmgCy69fn7QKBgQCI\n2m7w3vBUqMj0QZp5hHFoMVHCPJwjcvI4R8/x20yMxkuKn28RD7D7w2LzHqhhxwB5\nDsvkhflwZhLQTk2iM8OLOfLjHXuPQ54OO126FpUch4aLnoKtKSSngNQfxLJtErPL\nXEykNrElnXGeUTa6wGF5JEsar/jx1H1pwEDzc+XUuQKBgQDbebG/g4XRAk9Zdz48\nuxoX+rGfkFXBSHBvShFPbZVeMVI+2fSkuCPYsQheQ5G3PO8C706GCkbvu9FK1oFb\nRVOM4iSoTPakdo1qW4TqNtImur5ncNTha5AqkC5YWtfvb/BVjlqAx4uUdEiHK+fV\nwudj+Lg2Oi88ONfYNZtz9I0QZg==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@video-processor-d7410.iam.gserviceaccount.com",
  "client_id": "107681437363904721004",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40video-processor-d7410.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com",
  "storageBucket": "gs://video-processor-d7410.firebasestorage.app",
};

// Or import a JSON you’ve dropped into your src folder:
// import firebaseConfig from "./firebaseConfig.json";

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
