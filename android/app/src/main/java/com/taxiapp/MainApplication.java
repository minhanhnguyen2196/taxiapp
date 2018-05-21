package com.taxiapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.jamesisaac.rnbackgroundtask.BackgroundTaskPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import br.com.dopaminamob.gpsstate.GPSStatePackage;
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.rhaker.reactnativesmsandroid.RNSmsAndroidPackage;



import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BackgroundTaskPackage(),
          new ReactNativePushNotificationPackage(),
          new GPSStatePackage(),
          new LocationServicesDialogBoxPackage(),
          new RNSpinkitPackage(),
          new RNGoogleSigninPackage(),
          new RNGooglePlacesPackage(),
          new VectorIconsPackage(),
          new MapsPackage(),
          new RNGeocoderPackage(),
          new RNSmsAndroidPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    BackgroundTaskPackage.useContext(this);
  }
}
