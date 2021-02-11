export class QueryConstent {

    public static readonly createUserQuery:string = "INSERT INTO users (id,name,nickname,emailid,mobile,isactive,isdeleted,isemailvalidate) VALUES(?,?,?,?,?,?,?,?)";
    public static readonly createPasswordQuery:string ="INSERT INTO password (id,password,userid) VALUES(?,?,?)";
    public static readonly createRoleQuery:string ="INSERT INTO role (id,name) VALUES(?,?)";
    public static readonly createUserRoleQuery:string ="INSERT INTO userrole (id,userid,roleid) VALUES(?,?,?)";
}