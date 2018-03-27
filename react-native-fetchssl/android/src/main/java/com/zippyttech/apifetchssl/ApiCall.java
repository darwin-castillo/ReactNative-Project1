package com.zippyttech.apifetchssl;

import android.content.Context;
import android.content.SharedPreferences;
import android.renderscript.Sampler;
import android.util.Log;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;

import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.security.Key;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

/**
 * Created by zippyttech on 01/12/16.
 */

public class ApiCall {
    private static final String TAG = "ApiCall";
    HttpEntity<String> requestEntity;
    HttpHeaders requestHeaders;


    public ApiCall(ReadableMap headers) {


        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("GMT"), Locale.getDefault());
        Date currentLocalTime = calendar.getTime();
        DateFormat date = new SimpleDateFormat("Z");
        String localTime = date.format(currentLocalTime);

        try {
            SSLContext sslc = SSLContext.getInstance("TLS");
            TrustManager[] trustManagerArray = { new NullX509TrustManager() };
            sslc.init(null, trustManagerArray, null);
            HttpsURLConnection.setDefaultSSLSocketFactory(sslc.getSocketFactory());

        } catch(Exception e) {
            e.printStackTrace();
        }

        HttpsURLConnection.setDefaultHostnameVerifier(new HostnameVerifier() {
            public boolean verify(String hostname, SSLSession session) {

              if(session.isValid())
                  return true;
                else
                    return false;
            }
        });

        requestHeaders = new HttpHeaders();
        recursivelyDeconstructReadableMap(headers);

    }


    private ReadableMap /* Map<String, Object>*/  recursivelyDeconstructReadableMap(ReadableMap readableMap) {
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        Map<String, Object> deconstructedMap = new HashMap<>();
        ReadableMap auxReadable = null;
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = readableMap.getType(key);
            switch (type) {
                case Null:
                  //  deconstructedMap.put(key, null);
                    requestHeaders.add(key,null);
                    break;
                case Boolean:
                    requestHeaders.add(key, String.valueOf(readableMap.getBoolean(key)));
                    break;
                case Number:
                    requestHeaders.add(key,  String.valueOf(readableMap.getDouble(key)));
                    break;
                case String:
                    requestHeaders.add(key, readableMap.getString(key));
                    break;
                 case Map:
                     auxReadable = readableMap;
                   recursivelyDeconstructReadableMap(readableMap.getMap(key));
                   // requestHeaders.add(key, recursivelyDeconstructReadableMap(readableMap.getMap(key)));
                    break;

                default:
                    throw new IllegalArgumentException("Could not convert object with key: " + key + ".");
            }

        }
       return auxReadable;
    }


    private static class NullX509TrustManager implements X509TrustManager {
        public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
            System.out.println();
        }
        public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
            System.out.println();
        }
        public X509Certificate[] getAcceptedIssuers() {
            return new X509Certificate[0];
        }
    }


    public String callGet(String url) {
        Log.i("GET REQUEST", url);
        String resp = null;
        try {
            requestEntity = new HttpEntity<String>(requestHeaders);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);
            resp = responseEntity.getBody();

            Log.i("GETAlgo", resp);

        } catch (RestClientException e) {
            resp = setErrorMessages(((HttpStatusCodeException) e).getStatusCode().value());
            e.printStackTrace();
            return resp;
        }
        return resp;
    }

    public String callPost(String url, String data) {
        Log.i("POST REQUEST", "url:" + url);
        Log.i("POST REQUEST", "data"+data);
        String resp = null;
        try {
            HttpEntity<String> entity = new HttpEntity<String>(data, requestHeaders);
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

            int status = response.getStatusCode().value();
            if (status == 200 || status == 201 )
                resp = response.getBody();
            else if(status == 422)
                resp = "error 422 "+response.getBody();
            else
                resp = "error " + status;

            Log.i("POST", "resp "+resp);

        } catch(RestClientException e){
            //process exception
            if(e instanceof HttpStatusCodeException) {
                resp = "error "+ ((HttpStatusCodeException) e).getStatusCode()+" " +((HttpStatusCodeException) e).getResponseBodyAsString();

                Log.i("POST", "error:" + resp);

                HttpStatus statusCode = ((HttpStatusCodeException) e).getStatusCode();

                Log.i("StatusCode", statusCode.toString());
                if( statusCode == HttpStatus.UNAUTHORIZED){
                    Log.i("StatusCode", statusCode.toString());
                }
                resp = setErrorMessages(((HttpStatusCodeException) e).getStatusCode().value());
            }
        }
        return resp;
    }


    public String callPut(String url, String data) {
        Log.i("PUT REQUEST", url);
        String resp = null;
        try {
            HttpEntity<String> entity = new HttpEntity<String>(data, requestHeaders);
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PUT, entity, String.class);
            resp = response.getBody();

            Log.i("PUT", resp);

        } catch (RestClientException e) {
            resp = setErrorMessages(((HttpStatusCodeException) e).getStatusCode().value());
            e.printStackTrace();
            return resp;
        }
        return resp;
    }

    public String callDelete(String url) {
        HttpEntity<String> entity = new HttpEntity<String>(requestHeaders);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = null;
        String resp = null;
        try {
        Log.i("DELETE REQUEST", url);
          response = restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);
            resp = response.getBody();
            Log.i("DELETE", "Algo" +resp);

        } catch (RestClientException e) {
            resp = setErrorMessages(((HttpStatusCodeException) e).getStatusCode().value());
            e.printStackTrace();
            return resp;
        }
        return  resp;
    }

    public String setErrorMessages(int status){
        JSONObject error = new JSONObject();
        try {
            if (status == 401) {
                error.put("error", "401 UNAUTHORIZED");
                error.put("status",401);
            }
            if(status == 500){
                error.put("error", "500 INTERNAL ERROR");
                error.put("status",500);
            }
            if(status == 403){
                error.put("error", "403 FORBIDDEN");
                error.put("status",403);
            }
            if(status == 422){
                error.put("error", "422 UNPROCESABLE ENTITY");
                error.put("status",422);
            }
            if(status == 404){
                error.put("error", "404 NOT FOUND");
                error.put("status",404);
            }
            if(status == 400){
                error.put("error", "400 BAD REQUEST");
                error.put("status",400);
            }
            return error.toString();

        }
        catch (Exception e){
            e.printStackTrace();
            return "{\"error\":\"UNKNOWN ERROR\", \"status\":0}";
        }
    }



}
