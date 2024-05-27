import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SpaceBearModule = buildModule("SpaceBearModule", (m) => {
  const spaceBear = m.contract("SpaceBear", [], {});

  return { spaceBear };
});

export default SpaceBearModule;
