# Visual Testing for Plissee-Experte with Percy/Cypress
Automated process of detecting and reviewing daily visual UI changes of https://www.....
 
***

## **Update TestCases on IONOS Server**
 

Every night (during the week - Sunday to Thursday) at 11:30 p.m. all visual test cases (PEX) run against production server. The test cases are executed via cron-job on a server from IONOS. In order to make the latest changes of the test cases available on the server follow the following steps:


* establish a ssh connection to the server with the following configuration
* Host: 82.165.75.148
* Port: 22
* user: root,  pwd: Oa416EwFiQ
  * > ssh root@82.165.75.148
  * > password: Oa416EwFiQ
* navigate to source-folder
  * > cd /var/www/html/percy-test
  * > git pull
* type in github username and password

***

## **Run tests manually**
First the percy token needs to be set before running the tests. This step is needed for authentication and reviewing the test results on the percy dashboard. Without setting this token no snapshots will be taken and no results will be shown on the dashboard. 
Percy requires a token environment variable to be set:
> PERCY_TOKEN

**find percy token:**

  > visit https://percy.io/ec2e010d
  > signin with our browserstack account
  > select project (here PEX)
  > select Project settings

 **set percy token under Windows (in project folder):**
 
  > set  PERCY_TOKEN=2a4f9192c4bbd727763302618233efe6217ed6d86226a8613dec2d38dfd9a0bd 
  
 **set percy token under Unix (in project folder):**

  > export  PERCY_TOKEN=2a4f9192c4bbd727763302618233efe6217ed6d86226a8613dec2d38dfd9a0bd
    
This token is unique for each Percy repository - you can find it in the percy project settings (as described above).

**run all tests with:**

 > npx percy exec -- cypress run (in project folder)
 
**run all tests with bash:**

 > bash /var/www/html/percy-test/cron/regression_test.sh (in root folder)
 
**run specific test with:**

 > npx percy exec -- cypress run --spec "cypress/integration/test.spec.js"


***


## **Structure**


-  we have eleven test files in total:
	- **_category_pages.spec.js_**
	- **_cms_prio1.spec.js_**
	- **_cms_prio2.spec.js_**
	- **_product_pages.spec.js_**
	- **_configurator_senkrechteFenster.spec.js_**
	- **_configurator_dachfenster.spec.js_**
	- **_configurator_sonderformen_dreiecke.spec.js_**
	- **_configurator_sonderformen_vierecke.spec.js_**
	- **_configurator_sonderformen_fuenf_sechs_ecke.spec.js_**
	- **_configurator_sonderformen_plafond.spec.js_**

- The .spec.js files are located in the integration folder, i.e.:

> _cypress/integration/category_pages.spec.js_

### **Capture snapshot of each link which is visited**
 
- Within the tests _category_pages, cms_prio1, cms_prio2 and product_pages_ different PEX-links are visited and snapshots of each link are taken. The links are strored in separate json-files in folder fixtures:

> _cypress/fixtures/**category_pages.json**_

> _cypress/fixtures/**cms_prio1.json**_

> _cypress/fixtures/**cms_prio2.json**_

> _cypress/fixtures/**product_pages.json**_



### **Capture visual changes of the UI during product configuration**

- Within the configurator tests (_configurator_senkrechteFenster.spec.js, configurator_dachfenster.spec.js and configurator_sonderformen.spec.js_) different steps of the configurators  are run through which leads to visual changes. Every change is being held on a separate snapshot.
For example the visual change when switching to DF ungenormt:

![Ungenormte DF](/IMAGES/ungenormteDF.png)

### **Capture infoboxes while hovering elements**

- Additionally each infobox (with exceptions as described below) which is visible when hovering over certain elements is captured on a separate snapshot, i.e.:

![Infobox VS2](/IMAGES/infoboxVS2.png)

### **Ignoring specific elements**
With Percy it is possible to ignore dynamic elements or specific regions.
As we have some youtube videos and dynamic elements (i.e. the slider on the main page) on PEX it makes sense to hide/ignore those elements. There are some configuration options in Percy as described in https://docs.percy.io/docs/sdk-configuration
We used the configuration in package.json:


     "percy": {
     "version": 1,
     "snapshot": {
       "percy-css": ".category-slider { display: none !important; } iframe { display: none !important; } #shopauskunft_widget { display: none !important; }"
   }

**With this configuration the dynamic slider, youtube videos and the Shopauskunft.de-Image are ignored.**

***

## **useful information**

### **base-build selection**
Currently the latest build in the same branch (default: master) is selected automatically by percy as base build. This means in our case that the build from the previous day (previous run) is set as base build by Percy. 

We would like to set a specific build run in the same branch (master) as baseline for all upcoming builds and expected that approving a new build or individual snapshot would set the approved ones as new baselines. 

But what we observed is that if you don't approve a build - so the status remains "unreviewed" - the next build will use this "unreviewed" build as baseline instead of the last approved build.

**What we asked the support:**

1. Why does Percy take the last unreviewed build as baseline and not the last approved build?

2. Is there a way to set the last approved build as baseline for all upcoming snapshots (in the same branch)? So we do not want to use the unreviewed builds as baseline.

3. What is the purpose of approving a snapshot when an upcoming unreviewed build will be used automatically by Percy as baseline?

**What we get from support:**

Percy's baseline picking logic doesn't take into account approvals or rejects. It's all facilitated via git (SHA's and branches). Any build on the baseline branch (`master` by default) will become the new baseline for future builds to be compared to. 

Percy uses git to try and find the common ancestor commit between the baseline branch & the current working branch (in an effort to only show changes introduced in that given commit).

In case you do not have any build on the baseline branch (default branch), the builds will be compared with a previous build on the same branch.

**Workaround:**

With PERCY_TARGET_BRANCH = master (by default) and a second branch (e.g. "dailyTest") for daily tests all snapshots of the branch "dailyTest" will be compared with the last full build of branch "master" (instead of the build from the previous day).
We will use this workaround since there is no better option set a stable master.

### **fuzz factor**

The most popular way to detect the difference in colors with math is with a measurement called delta-e, which represents the "distance" between two colors. A distance less than or equal to 2 is generally considered to be perceptually equivalent. The delta-e between white and grey (see following image) is actually only about 6.1993. 

For reference to how delta-e is calculated, you can check out this link: http://colormine.org/delta-e-calculator 

![difference not marked](/IMAGES/switchNoDifference.png)

For reference, the distance between red and pink is about 90, and the distance between red and blue is about 176.

By default, Percy diffs actually ignore color differences of less than 10 (called a fuzz factor). That's why the change from light grey to white was not detected as a diff by Percy.

The support is able to adjust the fuzz factor. We asked the Percy support to set the fuzz factor to 3 for PEX in order to detect diffs between light colors and white.

​

***

## **Open Issues**



### **(A) radio button of VS1/VS2 AND Dreieck not checked on snapshots** 


### **VS1/VS2:**

The selection of VS1 or VS2 is not visible on any snapshot (the radio button is never checked), i.e.:

[Build #310 - VS1 selected](https://percy.io/ec2e010d/PEX/builds-next/8552799/search/preview/486163347?browser=chrome&searchParam=VS1&viewLayout=overlay&viewMode=new&width=1280)

![VS1 not selected](/IMAGES/VS1notSelected.png)

On the screenshot above you can see that VS1 is actually selected because some of the "Befestigungen" are inactive/not selectable whis is correct when selecting VS1.
But the radio check @VS1 is missing.

### **Dreieck:**
Same case when selecting Dreieck in Tab "Sonderformen". Dreieck is selected - you can see that on the plissee types - but the radio button is not checked on snapshots.

![Dreieck not selected](/IMAGES/dreieckSelection.png)

--> ***a corresponding email was sent to support***


### **(B) Capture popups of Filter**
In addition to the existing snapshots we could capture the popups of the filter menu on the left sight when loading category pages

example:
![Image of filter popup](/IMAGES/filterPopup.png)

***

## **Workarounds**

### **Make sure all ressources are loaded before snapshot**

In order to speed up the page load we are using lazyload @PEX (the webpage is lazy loading the images). Unfortunately this has the disadvantage that not all ressources are loaded intime before the snapshot is taken by cypress/percy.
Since Percy captures the snapshot of the DOM and renders the same, in case the image is not visible in the DOM when the snapshot is captured, the snapshot will be incomplete.

**scroll to the bottom:**

As described in https://docs.percy.io/docs/capturing-lazy-loading-images we use the scroll-to-bottomjs package on NPM. 
The key to this is scrolling the page past all of the lazy-loaded images, triggering them to load their full resolution image. Following setting ensures that all images are loaded before the snapshot is taken:

    cy.window().then(cyWindow => scrollToBottom({ frequency: 150, timing: 20, remoteWindow: cyWindow }));


frequency 150: (default: 100) - How many scroll increments

timing 20: (default: 8) - The amout of ms to pause between scroll increments

remoteWindow: (default: window) - The browsers window object. Can be handly for test runners like Cypress, which run the subjects test in a remote iframe

**scroll back to the top:**

In some cases we need to scroll back to the top of the page before the snapshot is taken as the filter menu on the left side moves up during the scroll down and blocks other elements while the snapshot is taken, e.g.:

![Infobox Standardgriff](/IMAGES/filtermenuBlocks.png)

---


### **Hovering blue info icons fails**

Our first intend was to hover over the blue info icons to make the popup infoboxes visible and make a snapshot of this scenario, i.e.:

![Infobox Standardgriff](/IMAGES/hoverInfoIcon.png)

This did not work as the blue info icons are created with pseudo css selectors which are not compatible with cypress.
Therefore we hover the label elements (with .trigger('mouseover') and .trigger('mouseout')) to make sure the info popups are visible before the snapshot and invisible after the snapshot, i.e.:

        cy.get('span[class="ptyp-vs2"]').trigger('mouseover')
        cy.percySnapshot('infobox: VS2')
        cy.get('span[class="ptyp-vs2"]').trigger('mouseout')


---


### **Exceptions**
It was not possible to capture all available info popups. The reason is that .trigger('mouseover') focuses the center of the selected element. After the popup appears in some cases the popup covers the center of its element and other elements. Calling .trigger('mouseout') fails at this point because the center is blocked by the visible popup. This behavior leads to a failed test.
Therefore we decided to leave out this kind of popups in order to avoid failing tests.