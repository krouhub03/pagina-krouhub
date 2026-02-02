
'use client';
import Script from 'next/script';

export default function MetricoolTracker() {
    return (
        <Script
            id="metricool-tracker"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                    function loadScript(a){
                        var b=document.getElementsByTagName("head")[0],
                        c=document.createElement("script");
                        c.type="text/javascript",
                        c.src="https://tracker.metricool.com/resources/be.js",
                        c.onreadystatechange=a,
                        c.onload=a,
                        b.appendChild(c)
                    }
                    loadScript(function(){
                        if(typeof beTracker !== 'undefined') {
                            beTracker.t({ hash: "82c2ed25b06ec6b69e5f249c23f9e2b4" });
                        }
                    });
                `,
            }}
        />
    );
}
