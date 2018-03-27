package com.zippyttech.apifetchssl;
import android.os.AsyncTask;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by zippyttech on 24/03/18.
 */

public class ThreadingData extends AsyncTask<String,String,String> {
    private String method;
    private String endpoint;
    private String body;
    private ReadableMap headers;
    private Callback callback = null;
    private ApiCall call;
    private Promise promise = null;
    private final String errorMethod =  "{\"error\":\"method not allowed\"}";
    public ThreadingData(String method, String endpoint, String body, ReadableMap headers, Callback callback){
        this.method=method;
        this.endpoint=endpoint;
        this.body=body;
        this.headers=headers;
        this.callback=callback;
        this.call=new ApiCall(headers);

    }

    public ThreadingData(String method, String endpoint, String body, ReadableMap headers, Promise promise){
        this.method=method;
        this.endpoint=endpoint;
        this.body=body;
        this.headers=headers;
        this.callback=null;
        this.promise=promise;
        this.call=new ApiCall(headers);


    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
    }

    @Override
    protected String doInBackground(String... strings) {
       String response ="";
        if(this.method.equals(RNFetchssl.POST)){
           response = call.callPost(endpoint,body);
       }
      else if(this.method.equals(RNFetchssl.GET)){
            response = call.callGet(endpoint);
       }
       else if(this.method.equals(RNFetchssl.PUT)){
           response = call.callPut(endpoint,body);
       }
      else  if(this.method.equals(RNFetchssl.DELETE)){
           response = call.callDelete(endpoint);
        }
        else{
          response = errorMethod;
        }
       return response;
    }

    @Override
    protected void onPostExecute(String resp) {
        super.onPostExecute(resp);

       if(resp!=null){
           try {
               JSONObject jsob = new JSONObject(resp);
              if(callback!=null) {
                  if (!jsob.has("error"))
                      this.callback.invoke(resp, null);

                  else
                      this.callback.invoke(null, resp);
              }
              else{
                  if (!jsob.has("error"))
                     promise.resolve(resp);
                  else
                      promise.reject(new Throwable(resp));
              }

           } catch (JSONException e) {
               e.printStackTrace();
               resp ="{\"error\":\"format error\"}";
              if(callback!=null)
               this.callback.invoke(null,resp);
              else
                  this.promise.reject(e.getCause());
           }

       }

    }
}
