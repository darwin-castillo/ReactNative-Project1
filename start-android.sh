#!/bin/bash

echo "configuring ANDROID_HOME..."
export ANDROID_HOME=$HOME/Android/Sdk
echo 'Path ANDROID_HOME=$ANDROID_HOME'
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
react-native run-android
