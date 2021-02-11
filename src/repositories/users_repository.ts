
import { IResponse } from '../model/index';
import uuid from 'uuid-random';
import { QueryConstent } from '../constent/query_constent';
var db = require('../dbconfig');

export class UsersRepository {

    async createUsers(req: any) {
        try {
            var query = "SELECT * from users where emailid='" + req.body.emailid + "' ALLOW FILTERING;";
            console.log("query", query);
            var user = await db.query(query);
            if (user.rows.length == 0) {
                let userUuid = uuid();
                // var query = "INSERT INTO users (id,name,nickname,username,emailid,mobile,isactive,isdeleted,isemailvalidate) VALUES(" + userUuid + ",'" + req.body.name + "','" + req.body.nickname + "','" 
                //     + req.body.username + "','" + req.body.emailid + "','" + req.body.mobile + "',true,false,false);";
                // console.log("query",query);

                let userData: any = [userUuid, req.body.name, req.body.nickname, req.body.emailid, req.body.mobile, true, false, false];
                var data = await db.queryArrayObject(QueryConstent.createUserQuery, userData);

                if (data) {
                    var query = "INSERT INTO password (id,password,userid) VALUES(" + uuid() + ",'" + req.body.password + "','" + userUuid + "');";
                    console.log("query", query);
                    var data = await db.query(query);

                    // let uuidPassword:any= uuid();
                    // let userPasswod:any = [uuidPassword,req.body.password,userUuid];
                    // var data = await db.queryArrayObject(QueryConstent.createPasswordQuery,userPasswod);
                    if (data) {
                        console.log("permission ", req.body.permission);
                        var setPermission = new Set(req.body.permission.split(","));
                        console.log("permission ", setPermission);
                        var query = "INSERT INTO roleusers (uid,role,permission) VALUES(" + userUuid + ",'" + req.body.rolename + "',{" + req.body.permission + "});";
                        console.log("query", query);
                        var data = await db.query(query);
                        if (data) {
                            const iResponse: IResponse = {
                                statusCode: "201",
                                message: "User created successfully",
                                data: "",
                                uuid: userUuid,
                                error: ""
                            }
                            return iResponse;
                        }




                        // let uuidRole:any= uuid();
                        // let role:any = [uuidRole,req.body.rolename];
                        // var data = await db.queryArrayObject(QueryConstent.createRoleQuery,role);

                        // if(data){

                        //     let uuidUserRole  = uuid();
                        //     var query = "INSERT INTO userrole (id,roleid,userid) VALUES(" + uuid() + ",'" + uuidRole + "','" + userUuid + "');";
                        //     console.log("query",query);
                        //     var data = await db.query(query);
                        //     // let roleUser:any = [uuidUserRole,uuidRole,userUuid];
                        //     // var data = await db.queryArrayObject(QueryConstent.createUserRoleQuery,roleUser);
                        //     const iResponse: IResponse = {
                        //         statusCode: "201",
                        //         message: "User created successfully",
                        //         data: "",
                        //         uuid:userUuid,
                        //         error: ""
                        //     }
                        //     return iResponse;
                        // }

                    }

                }
            } else {
                const iResponse: IResponse = {
                    statusCode: "201",
                    message: "User Already Exists",
                    data: "",
                    error: ""
                }
                return iResponse;
            }


        } catch (error) {
            console.error(error.message);
            const iResponse: IResponse = {
                statusCode: "500",
                message: "Something went worng",
                data: "",
                uuid: "",
                error: error.message
            }
            return iResponse;
        } finally {
            //db.close();
        }

    }
    async getUserByEmailIdAndPassword(req: any) {
        try {
            var query = "SELECT * from users where emailid='" + req.body.emailid + "' ALLOW FILTERING;";
            console.log("query", query);
            var userData = await db.query(query);
            if (userData.rows.length > 0) {
                let query = "SELECT * from password where password='" + req.body.password + "' AND userid='" + userData.rows[0].id + "' ALLOW FILTERING;";
                console.log("query", query);
                var passwordData = await db.query(query);
                console.log("passwordData ", passwordData);
                if (passwordData.rows[0].password != null) {
                    if (req.body.emailid === userData.rows[0].emailid && req.body.password === passwordData.rows[0].password) {
                        let getToken = "SELECT * FROM usertoken where userid='" + userData.rows[0].id + "' AND isactive = true ALLOW FILTERING;";
                        console.log("query", getToken);
                        var tokenDetails = await db.query(getToken);
                        //console.log("token Data",tokenDetails.rows[0].tokendata);
                        if (tokenDetails.rows.length > 0 && tokenDetails.rows[0].tokendata !== null && tokenDetails.rows[0].isactive === true) {

                            let getRoleId = "SELECT role from roleusers where uid=" + userData.rows[0].id + " ALLOW FILTERING;";
                            console.log("query", getRoleId);
                            var roleData = await db.query(getRoleId);
                            let userTokenDetails = {
                                token: tokenDetails.rows[0].tokendata,
                                tokenId: tokenDetails.rows[0].id
                            }
                            const iResponse: IResponse = {
                                statusCode: "200",
                                message: "Login successfully.",
                                data: roleData.rows,
                                token: userTokenDetails,
                            }
                            return iResponse;

                            // let getRoleId = "SELECT roleid from userrole where userid='"+userData.rows[0].id+"' ALLOW FILTERING;";
                            // console.log("query",getRoleId);
                            // var roleIdData = await db.query(getRoleId);
                            // if(roleIdData.rows.length > 0){
                            //     let roleArray:string[] = new Array();
                            //     for(let i = 0; i < roleIdData.rows.length; i++){
                            //         console.log(roleIdData.rows[i].roleid);
                            //         roleArray.push(roleIdData.rows[i].roleid);
                            //     }
                            //     let getRole = "SELECT name from role where id in("+roleArray.toString()+") ALLOW FILTERING;";
                            //     console.log("query",getRole);
                            //     var roleName = await db.query(getRole);
                            //     let userTokenDetails = {
                            //         token:tokenDetails.rows[0].tokendata,
                            //         tokenId:tokenDetails.rows[0].id
                            //     }
                            //     const iResponse: IResponse = {
                            //         statusCode: "200",
                            //         message: "Login successfully.",
                            //         data: roleName.rows,
                            //         token:userTokenDetails
                            //     }
                            //     return iResponse;
                            // }

                        } else {
                            let token = uuid().toString() + "-" + uuid().toString();
                            let userTokenId = uuid();
                            let query = "INSERT INTO usertoken (id,tokendata,userid,isactive) VALUES(" + userTokenId + ",'" + token + "','" + userData.rows[0].id + "',true);";
                            console.log("query", query);
                            var tokenData = await db.query(query);
                            if (tokenData) {
                                let getRoleId = "SELECT role from roleusers where userid='" + userData.rows[0].id + "' ALLOW FILTERING;";
                                console.log("query", getRoleId);
                                var roleData = await db.query(getRoleId);
                                let userTokenDetails = {
                                    token: token,
                                    tokenId: userTokenId
                                }
                                const iResponse: IResponse = {
                                    statusCode: "200",
                                    message: "Login successfully.",
                                    data: roleData.rows,
                                    token: userTokenDetails,
                                }
                                return iResponse;



                                // if(roleIdData.rows.length > 0){
                                //     let roleArray:string[] = new Array();
                                //     for(let i = 0; i < roleIdData.rows.length; i++){
                                //         console.log(roleIdData.rows[i].roleid);
                                //         roleArray.push(roleIdData.rows[i].roleid);
                                //     }
                                //     let getRole = "SELECT name from role where id in("+roleArray.toString()+") ALLOW FILTERING;";
                                //     console.log("query",getRole);
                                //     var roleName = await db.query(getRole);
                                //     let userTokenDetails = {
                                //         token:token,
                                //         tokenId:userTokenId
                                //     }
                                //     const iResponse: IResponse = {
                                //         statusCode: "200",
                                //         message: "Login successfully.",
                                //         data: roleName.rows,
                                //         token:userTokenDetails,
                                //     }
                                //     return iResponse;
                                // }
                            }
                        }
                    } else {
                        const iResponse: IResponse = {
                            statusCode: "200",
                            message: "Login details not matched",
                        }
                        return iResponse;
                    }
                } else {
                    const iResponse: IResponse = {
                        statusCode: "200",
                        message: "Password did not match.",
                        data: "",
                        uuid: "",
                        error: ""
                    }
                    return iResponse;
                }
            } else {
                const iResponse: IResponse = {
                    statusCode: "200",
                    message: "Email Id not exist",
                    data: "",
                    uuid: "",
                    error: ""
                }
                return iResponse;
            }

        } catch (error) {
            console.error(error.message);
            const iResponse: IResponse = {
                statusCode: "500",
                message: "Something went worng",
                data: "",
                uuid: "",
                error: error.message
            }
            return iResponse;
        } finally {
            // db.close();
        }

    }

    async userLogout(req: any) {
        try {
            var query = "UPDATE usertoken SET isactive = false WHERE id=" + req.body.tokenId + ";";
            console.log("query", query);
            var userData = await db.query(query);
            console.log(userData);
            const iResponse: IResponse = {
                statusCode: "200",
                message: "Successfully logout user"
            }
            return iResponse;

        } catch (error) {
            console.error(error.message);
            const iResponse: IResponse = {
                statusCode: "500",
                message: "Something went worng",
                data: "",
                uuid: "",
                error: error.message
            }
            return iResponse;
        } finally {
            // db.close();
        }
    }
    async getUserList(req: any) {
        try {
            var query = "SELECT * FROM users;";
            console.log("query", query);
            var userData = await db.query(query);
            console.log(userData);
            if (userData.rows.length > 0) {
                const iResponse: IResponse = {
                    statusCode: "200",
                    message: "Successfully fetch user list.",
                    data: userData.rows
                }
                return iResponse;
            } else {
                const iResponse: IResponse = {
                    statusCode: "200",
                    message: "No data found."
                }
                return iResponse;
            }

        } catch (error) {
            console.error(error.message);
            const iResponse: IResponse = {
                statusCode: "500",
                message: "Something went worng",
                data: "",
                uuid: "",
                error: error.message
            }
            return iResponse;
        } finally {
            // db.close();
        }
    }
    async getUserById(req: any) {
        console.log("req", req.params);
        try {
            var query = "SELECT * FROM users where id=" + req.params.userId + ";";
            console.log("query", query);
            var userData = await db.query(query);
            console.log(userData);
            if (userData.rows.length > 0) {

                var query = "SELECT role FROM roleusers where uid=" + req.params.userId + ";";
                console.log("query", query);
                var roleData = await db.query(query);
                let userroles = {
                    user: userData.rows,
                    role: roleData.rows
                }
                const iResponse: IResponse = {
                    statusCode: "200",
                    message: "Successfully fetch user data.",
                    data: userroles
                }
                return iResponse;
            } else {
                const iResponse: IResponse = {
                    statusCode: "200",
                    message: "No data found."
                }
                return iResponse;
            }

        } catch (error) {
            console.error(error.message);
            const iResponse: IResponse = {
                statusCode: "500",
                message: "Something went worng",
                data: "",
                uuid: "",
                error: error.message
            }
            return iResponse;
        } finally {
            // db.close();
        }
    }
}