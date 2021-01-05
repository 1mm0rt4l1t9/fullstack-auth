import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    textDecoration: "none"
  },
  // Auth
  authBlock: {
    width: 400,
    marginTop: 140,
    paddingTop: 30,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
  },
  inputContain: {
    paddingBottom: 40,
  },
  buttonContain: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },
});