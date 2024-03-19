import * as React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, makeStyles } from "@material-ui/core";
import {
  Facebook,
  Instagram,
  GitHub,
  YouTube,
  LinkedIn,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  footerText: {
    color: "#000",
    fontFamily: "Inter",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "150%",
  },
}));

export default function Footer() {
  const styles = useStyles();
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      style={{ padding: "20px" }}
    >
      <Grid item>
        <Typography className={styles.footerText}>BackTrack</Typography>
      </Grid>

      <Grid item>
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <Typography className={styles.footerText}>Features</Typography>
          </Grid>
          <Grid item>
            <Typography className={styles.footerText}>Get Started</Typography>
          </Grid>
          <Grid item>
            <Typography className={styles.footerText}>FAQs</Typography>
          </Grid>
          <Grid item>
            <Typography className={styles.footerText}>Profile</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Link href="" color="inherit">
          <Instagram />
        </Link>
        <Link href="https://www.facebook.com/" color="inherit">
          <Facebook />
        </Link>
        <Link href="" color="inherit">
          <GitHub />
        </Link>
        {/* style={{ filter: "grayscale(100%)" }} */}
        <Link href="" color="inherit">
          <LinkedIn />
        </Link>
        <Link href="" color="inherit">
          <YouTube />
        </Link>
      </Grid>
      <Grid
        item
        container
        mt={5}
        justifyContent="center"
        style={{ marginTop: "2%" }}
      >
        <Typography
          className={styles.footerText}
          style={{ fontWeight: "400" }}
          align="center"
        >
          {"Copyright © "} BackTrack {new Date().getFullYear()}
          {"."}
        </Typography>
      </Grid>
    </Grid>
  );
}
