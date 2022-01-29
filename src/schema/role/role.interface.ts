export default interface RoleInterface {
  id?: string;
  project: string;
  name: string;
  alias: string[];
  identity: string[];
  relationships: string[];
  basicSettings: string;
  image: string[];
  experience: string;
  showTip: boolean;
  createDate: string;
}
