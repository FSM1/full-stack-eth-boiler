import { Module, Global } from '@nestjs/common';
import { Modules } from '../app.constants';
import { ethers } from 'ethers';
import { env } from '../config/env';

const ethersProviderService = {
  provide: Modules.EthersProvider,
  // useValue: EthersProviderService,
  useFactory: () => {
    const provider = (env.ethers.provider !== 'jsonRpcProvider') ?
            ethers.getDefaultProvider(env.ethers.network) :
            new ethers.providers.JsonRpcProvider(env.ethers.rpcUrl);
    return provider;
  },
};

@Global()
@Module({
  providers: [ethersProviderService],
  exports: [ethersProviderService],
})
export class EthersProviderModule {}
