import { Box, Container } from "@material-ui/core";
import React from "react";
import "./style.css";
export default function PrivacyPolicy() {
  return (
    <>
      <Box>
        <Container>
          <div className="term-top"></div>
          <div className="term-top"></div>
             <div className="f-page">
          <h1 className="cent">Refund Policy </h1>
          <p>
            Ours is a career advisory and online teaching service and it gets
            delivered as soon as a person completes our video lectures/workshops
            and get the report(s).We do take utmost care in ensuring that the
            Assessments and Report(s) get delivered to the person’s correct
            Email address, as provided. Once the service gets delivered, we do
            not have any provision for cancellation of the service that the
            person has purchased or subscribed to.
            <br /> In case you feel that you did not get the service to your
            satisfaction level, you are requested to write in to hello@sircle.in{" "}
          </p>
          </div>
        </Container>
      </Box>
    </>
  );
}
