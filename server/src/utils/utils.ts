import { ApiError } from '../errors/api.error';


export class Utils {
    static checkRoleAccess(userRole: string) {
        if (!(userRole === 'Менеджер' || userRole === 'Администратор')) {
            throw ApiError.AccessDenied();
        }
    }

    static isDuplicate(result: boolean) {
        if (result) {
            throw ApiError.BadRequest('Дубликат!');
        }
    }
}