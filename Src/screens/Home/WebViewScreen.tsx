
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  BackHandler,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import apiUrls from '../../services/apiUrls';
import ApiService from '../../services/api';
 
function WebViewScreen() {
  const isDarkMode = useColorScheme() === 'dark';
 
  return (
    <SafeAreaProvider>
     
      <AppContent />
    </SafeAreaProvider>
  );
}
 
function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
 
  useEffect(() => {
  const onBackPress = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
 
    return false;
  };
 
  const subscription = BackHandler.addEventListener(
    'hardwareBackPress',
    onBackPress,
  );
 
  return () => subscription.remove();
}, [canGoBack]);
 
async function logCartToServer(
  payload: any,
  products: CartProduct[] = [],
) {
  try {
    console.log('============================');
    console.log('API URL:');
    console.log(payload?.url);
 
    console.log('----------------------------');
    console.log('REQUEST BODY:');
 
    if (typeof payload?.body === 'string') {
      const body = Object.fromEntries(
        new URLSearchParams(payload.body).entries(),
      );
      console.log(body);
    } else {
      console.log(payload?.body);
    }
 
    console.log('----------------------------');
    console.log('API RESPONSE:');
    console.log(payload?.response);
 
    console.log('----------------------------');
    console.log('EXTRACTED PRODUCTS:');
    console.log(products[0]);
       const orderPayload = {
      customerName: "",          // Replace with actual user data
      customerPhone: "",
      shippingAddress: "",
      items: products,
    };
 handleSubmit(orderPayload)
    console.log('============================');
  } catch (e) {
    console.log('Server log failed', e);
  }
}
 
 
type Variant = { name: string; value: string };
 
type CartProduct = {
 
  goodsId: string;
 
  spu: string;
 
  skuCode: string;
 
  goodsSn: string;
 
  name: string;
 
  brand: string;
 
  quantity: number;
 
  price: string;        // e.g. "AU$23.95"
 
  priceUsd: string;
 
  image: string;
 
  variants: Variant[];  // selected color/size
 
  addTime: string;
 
};
 
function extractCartProducts(rawResponse: string): CartProduct[] {
 
  // decode URL-encoded portions, then parse
 
  let json: any;
 
  try {
 
    json = JSON.parse(rawResponse);
 
  } catch {
 
    json = JSON.parse(decodeURIComponent(rawResponse));
 
  }
 
  const carts = json?.info?.carts ?? [];
 
  return carts.map((c: any) => {
 
    const p = c.product ?? {};
 
    return {
 
      goodsId: c.goodsId ?? c.goodId,
 
      spu: c.spu,
 
      skuCode: p.sku_code,
 
      goodsSn: p.goods_sn,
 
      name: p.goods_name,
 
      brand: p.brand,
 
      quantity: Number(c.quantity ?? p.quantity ?? 0),
 
      price: p.salePrice?.amountWithSymbol,
 
      priceUsd: p.salePrice?.usdAmountWithSymbol,
 
      image: p.goods_img ? `https:${p.goods_img}` : '',
 
      variants: (p.sku_sale_attr ?? []).map((a: any) => ({
 
        name: a.attr_name,        // "Color" / "Size"
 
        value: a.attr_value_name, // "Khaki" / "XS"
 
      })),
 
      addTime: c.add_time,
 
    };
 
  });
 
}
 

 const handleSubmit = async (data: any) => {
  console.log("rfbfbrb",apiUrls.createorder)
  try {
    const response = await ApiService.post(
      apiUrls.createorder,
      data
    );

    console.log(response.data);

    if (response.status === 201) {
      Alert.alert("Success", "Order created successfully");
    }
  } catch (error: any) {
    console.log(error.response?.data || error);
  }
};
 
  const injectedJS = `
(function() {
  function send(type, payload) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type, payload }));
  }
 
  // Match SHEIN's cart / wishlist endpoints
  function classify(url) {
    if (/add[_-]?to[_-]?cart|cart\\/add|\\/cart\\/update/i.test(url)) return 'ADD_TO_CART';
    if (/wishlist|wish\\/add|save[_-]?item|favorite/i.test(url)) return 'ADD_TO_WISHLIST';
    return null;
  }
 
  // Hook fetch
const originalFetch = window.fetch;
 
window.fetch = async function (...args) {
 
    const url = args[0]?.url || args[0];
 
    let body = args[1]?.body ?? null;
    const bodyString = payload.body;
 
const bodyObject = Object.fromEntries(
  new URLSearchParams(bodyString).entries()
);
console.log(
  JSON.stringify(bodyObject, null, 2)
);
console.log("URL:", payload.url);
console.log("BODY:", bodyObject);
 
    try {
        body = JSON.parse(body);
    } catch {}
 
    const response = await originalFetch.apply(this, args);
 
    let responseData = null;
console.log("response:", response);
    try {
 
        const clone = response.clone();
 
        responseData = await clone.text();
 
        try {
            responseData = JSON.parse(responseData);
        } catch {}
 
    } catch (e) {}
 
    window.ReactNativeWebView.postMessage(
        JSON.stringify({
            type: "API",
            payload: {
                url,
                body,
                response: responseData,
                status: response.status
            }
        })
    );
 
    return response;
};


function handleAction(action, body) {

    var b = parseBody(body);

    var goodsId = String(b.goods_id);

    var cached = productCache[goodsId] || {};

    var item = {

      goodsId: goodsId,

      skuCode: b.sku_code || '',

      name: cached.name || '',

      price: cached.price || '',

      priceUsd: cached.priceUsd || '',

      image: cached.image || '',

      brand: cached.brand || '',

      quantity: Number(b.quantity || 1),

      variants: resolveVariants(cached, b.sku_code),

      action: action,

      addedAt: Date.now()

    };

    post('CART_ITEM', item);

  }

 
  // Hook XHR
  const origOpen = XMLHttpRequest.prototype.open;
  const origSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function(method, url) {
    this.__url = url;
    return origOpen.apply(this, arguments);
  };
XMLHttpRequest.prototype.send = function(body) {

 
    const url = String(this.__url || '');
 
    const type = classify(url);
 
    let parsed = body;
 
    try {
        parsed = JSON.parse(body);
    } catch {}
 
    this.addEventListener('load', () => {
 
        let response = this.responseText;
 
        try {
            response = JSON.parse(response);
        } catch {}
 
        send(type || "API", {
            url,
            body: parsed,
            response,
            status: this.status
        });
 
    });
 
    return origSend.apply(this, arguments);
    
};
 
  true;
})();
`;
 
 
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: safeAreaInsets.top,
        },
      ]}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://au.shein.com/' }}
        injectedJavaScriptBeforeContentLoaded={injectedJS}
//         onMessage={(event) => {
//           try {
//             const { type, payload } = JSON.parse(event.nativeEvent.data);
 
 




//             let products: CartProduct[] = [];
 
// if (payload?.response) {
//   products = extractCartProducts(
//     JSON.stringify(payload.response),
//   );
// }
 
// logCartToServer(payload, products);




//             if (type === 'ADD_TO_CART') {
 
//   // payload.body is the cart base_info response
 
//   const products = extractCartProducts(JSON.stringify(payload.body));
 
//   logCartToServer(products);
 
// }
 
 
//             if (type === 'ADD_TO_CART' || type === 'ADD_TO_WISHLIST') {
//               console.log(type, payload);
//               // log to your analytics / Redux here
//               // logEvent(type, payload.body);
//             }
//           } catch (e) {
//             console.log('Parse error', e);
//           }
//         }}

        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        javaScriptEnabled
        domStorageEnabled
        allowsBackForwardNavigationGestures
        applicationNameForUserAgent="Safari"
        onMessage={(event) => {
  try {
    const { payload } = JSON.parse(event.nativeEvent.data);

    if (!payload) return;

    const products = extractCartProducts(
      JSON.stringify(payload.response),
    );

    if (!products.length) return;

    const body =
      typeof payload.body === 'string'
        ? Object.fromEntries(
            new URLSearchParams(payload.body).entries(),
          )
        : payload.body;

    const addedProduct = products.find(
      item =>
        String(item.goodsId) === String(body?.goods_id) &&
        String(item.skuCode) === String(body?.sku_code),
    );

    if (addedProduct) {
      console.log('==============================');
      console.log('ADDED PRODUCT');
      console.log(JSON.stringify(addedProduct, null, 2));
      const data =JSON.stringify(addedProduct, null, 2)
      console.log(data,'jfjrjfjjrjjfjrjjfrjjfj==============================');
    }

    logCartToServer(payload, products);
  } catch (e) {
    console.log(e);
  }
}}
        userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
 
export default WebViewScreen;
 
 