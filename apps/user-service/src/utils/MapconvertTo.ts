import { RoleDto } from "../dto/role.dto";
import { Role } from "../entity/role.entity";




    export const convertDtoToClass = (roleDto: RoleDto): Role => {
        const role = new Role();
        role.id_role = roleDto.id_role
        role.name = roleDto.name
        role.description = roleDto.description
        role.state = roleDto.state

        return role;
    }

    export const mapRoleToRoleDto = (role: Role): RoleDto => {
        const roleDto = new RoleDto();
        roleDto.id_role = role.id_role
        roleDto.name = role.name
        roleDto.description = role.description
        roleDto.state = role.state

        return roleDto;
    }
