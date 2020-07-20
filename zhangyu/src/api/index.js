import apiUrl from './apiUrl'
import apiUtil from './apiUtil'
const generateApiMap = apiUtil.generateApiMap({...apiUrl});
export default {
	...generateApiMap
}
