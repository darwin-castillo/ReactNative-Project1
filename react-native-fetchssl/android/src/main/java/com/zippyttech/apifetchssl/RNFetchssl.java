package com.zippyttech.apifetchssl;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.AsyncTask;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by zippyttech on 23/03/18.
 */

public class RNFetchssl extends ReactContextBaseJavaModule {

    private String packageName = null;
    private String displayName = null;
    private String version = null;
    private String versionCode = null;

    public static final String POST = "POST";
    public static final String GET = "GET";
    public static final String PUT = "PUT";
    public static final String DELETE = "DELETE";
    private ThreadingData threading;

    public RNFetchssl(ReactApplicationContext reactContext) {
        super(reactContext);

        try {
            PackageManager pManager = reactContext.getPackageManager();
            packageName = reactContext.getPackageName();
            PackageInfo pInfo = pManager.getPackageInfo(packageName, 0);
            ApplicationInfo aInfo = pManager.getApplicationInfo(packageName, 0);
            displayName = pManager.getApplicationLabel(aInfo).toString();
            version = pInfo.versionName;
            versionCode = String.valueOf(pInfo.versionCode);
        } catch (PackageManager.NameNotFoundException nnfe) {

        }
    }


    @ReactMethod
    public void callApi(String name, Boolean isAdmin, Callback callback) {
        System.out.println("User Name: " + name + ", Administrator :" + (isAdmin ? "is admin" : "no admin"));
        String greeting = "Welcome " + name + ", you " + (isAdmin ? "is admin" : "no admin");
        callback.invoke(greeting);
    }


    @ReactMethod
    public void fetch(String method, String endpoint, String body, ReadableMap hds, Callback callback) {
        new ThreadingData(method, endpoint, body, hds, callback).execute();
    }
    @ReactMethod
    public void post(String endpoint, String body, ReadableMap headers, Promise promise){
        new ThreadingData(POST,endpoint,body,headers,promise).execute();
    }
    @ReactMethod
    public void get(String endpoint,ReadableMap headers, Promise promise){
        new ThreadingData(GET,endpoint,"",headers,promise).execute();
    }
    @ReactMethod
    public void put(String endpoint,String body, ReadableMap headers, Promise promise){
        new ThreadingData(PUT,endpoint,body,headers,promise);
    }
    @ReactMethod
    public void delete(String endpoint, ReadableMap headers, Promise promise){
        new ThreadingData(DELETE,endpoint,"",headers,promise).execute();
    }

    @Override
    public String getName() {
        return "RNFetchssl";
    }
}
