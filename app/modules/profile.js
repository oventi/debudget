import { dqs } from '../danta/ui/util'

export const load_profile = ({ username }) => {
  dqs('div#greeting').textContent = `Kia ora ${username}`
}
