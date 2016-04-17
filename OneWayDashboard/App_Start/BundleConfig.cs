using System.Web;
using System.Web.Optimization;

namespace OneWayDashboard
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
            
            bundles.Add(new ScriptBundle("~/bundles/angular2").Include(
                "~/node_modules/es6-shim/es6-shim.js",
                "~/node_modules/underscore/underscore.js",
                "~/node_modules/systemjs/dist/system-polyfills.js",
                "~/node_modules/angular2/es6/dev/src/testing/shims_for_IE.js",

                "~/node_modules/angular2/bundles/angular2-polyfills.js",
                "~/node_modules/systemjs/dist/system.src.js",
                "~/node_modules/rxjs/bundles/rx.js",
                "~/node_modules/angular2/bundles/angular2.dev.js",
                "~/node_modules/angular2/bundles/router.dev.js",
                "~/node_modules/angular2/bundles/http.dev.js"
            ));
        }
    }
}
