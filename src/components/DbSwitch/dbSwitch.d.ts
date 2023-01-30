export type DbSwitchProps = {
  request?: (checked: boolean, params: Record<string, any>) => Promise<Partial<boolean>>;
  params: Record<string, any>
};
