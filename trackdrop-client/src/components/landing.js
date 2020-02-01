import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import Update from "@material-ui/icons/Update";
import LibraryMusic from "@material-ui/icons/LibraryMusic";

// core components
import Footer from "./Footer/Footer.jsx";
import GridContainer from "./Grid/GridContainer.jsx";
import GridItem from "./Grid/GridItem.jsx";
import Button from "./CustomButtons/Button.jsx";
import Parallax from "./Parallax/Parallax.jsx";
import InfoArea from "./InfoArea/InfoArea.jsx";

import landingPageStyle from "./landing/landingStyles.jsx";

import backgroundImage from "../assets/img/landing-bg.jpg";

// Sections for this page
//import ProductSection from "./Sections/ProductSection.jsx";
//import TeamSection from "./Sections/TeamSection.jsx";
//import WorkSection from "./Sections/WorkSection.jsx";

const dashboardRoutes = [];

class LandingPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Parallax filter image={backgroundImage}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Keep Making Music.</h1>
                <h4>
                  And share it with no hassle. Easy uploads and versioning allow colloboration and sharing
                  or both new ideas and completed tracks without worrying. I need more text, but have nothing else to say.
                  However, without four lines this might look dumb.
                </h4>
                <h3> Have an invite code? </h3>
                <br />
                <Button
                  color="danger"
                  size="lg"
                  href="/register"
                >
                  <i className="fas fa-play" />
                  Join the Beta Now
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
          <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.product_title}>Let's talk Trackdrop</h2>
            <h5 className={classes.product_description}>
              What do we say here? I don't know. Trackdrop is for Dave and Berner to share songs. Whole lot of work just for that...
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Communicate"
                description="Upload songs for others to listen to and provide feedback. Easily add timestamped notes for targeted advice."
                icon={Chat}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Build a Library"
                description="Upload and organize your tracks to listen on the go and get feedback from others."
                icon={LibraryMusic}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="History"
                description="Easily archive of old versions of tracks to allow analysis of the progression of songs as they mature to perfection."
                icon={Update}
                iconColor="danger"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const styledLanding = withStyles(landingPageStyle)(LandingPage);
export { styledLanding as Landing };
 //           <ProductSection />
  //          <TeamSection />
   //         <WorkSection />