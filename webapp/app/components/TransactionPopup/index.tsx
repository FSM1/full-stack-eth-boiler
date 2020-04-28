/**
 *
 * TransactionPopup
 *
 */

import React from 'react';
import { Theme, createStyles, withStyles, WithStyles, Typography, Container, Paper, CircularProgress, Link } from '@material-ui/core';
import { getNetwork } from 'ethers/utils';

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    container: {
      width: spacing(20)*2
    },
   
  });

interface OwnProps extends WithStyles<typeof styles> {
  txContext?: string;
  txHash?: string;
}

const TransactionPopup: React.FC<OwnProps> = ({
  txContext,
  txHash,
  classes
}: OwnProps) => {
  return <Paper>
      <Container maxWidth='lg' style={{overflow: 'hidden', alignContent: 'center'}}>
        <Typography>Transaction in progress</Typography>
        {
          txContext &&
          <Typography>{txContext}</Typography>
        }
        <CircularProgress />
        {
          txHash &&
          <Link href={`https://${getNetwork(parseInt(`${process.env.CHAIN_ID}`)).name}.etherscan.io/tx/${txHash}`} target="_blank" rel="noreferrer" >
            Etherscan
          </Link>
        }
      </Container>
    </Paper>
};

export default withStyles(styles, { withTheme: true })(TransactionPopup);
