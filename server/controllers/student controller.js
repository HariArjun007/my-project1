const mysql=require("mysql");




const con=mysql.createPool({
    host      : process.env.DB_HOST,
    user      : process.env.DB_USER,
    password  : process.env.DB_PASS,
    database  : process.env.DB_NAME
    
});




exports.view= (req,res)=>{
 
  con.getConnection((err,connection)=>{
    if(err) throw err
    connection.query("select * from data",(err,rows)=>{
        connection.release();
        if(!err){
            res.render("home",{rows});
        }else{
            console.log("error in listening data"+err);
        }
        });
    });
};
  
exports.adduser=(req,res)=>{
    res.render("adduser");
};

exports.save=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        const {name,age,city,email,DOB,education}=req.body;

        connection.query("insert into data (NAME,AGE,CITY,EMAIL,DOB,EDUCATION) values (?,?,?,?,?,?)",
        [name,age,city,email,DOB,education],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("adduser",{msg:"user Details Added SUCCESS!"});
            }else{
                console.log("error in listening data"+err);
            }
            });
        });
    }

    exports.edituser=(req,res)=>{
        con.getConnection((err,connection)=>{
            if(err) throw err
            let id=req.params.id;

            connection.query("select * from data where id=?",[id],(err,rows)=>{
                connection.release();
                if(!err){
                    res.render("edituser",{rows});
                }else{
                    console.log("error in listening data"+err);
                }
                });
            });
        };



  exports.edit=(req,res)=>{
        con.getConnection((err,connection)=>{
             if(err) throw err
            const {name,age,city,email,DOB,education}=req.body;
            let id=req.params.id;
    
          connection.query("update  data set NAME=?,AGE=?,CITY=?,EMAIL=?,DOB=?,EDUCATION=? where ID=?",
                [name,age,city,email,DOB,education,id],(err,rows)=>{
                    connection.release();
                    if(!err){
                        con.getConnection((err,connection)=>{
                            if(err) throw err
                            let id=req.params.id;

                
                            connection.query("select * from data where id=?",[id],(err,rows)=>{
                                connection.release();
                                if(!err){
                                   
                                    res.render("edituser",{ rows,msg:"user Details  Updated Successfully!"});
                                }else{
                                    console.log("error in listening data"+err);
                                }
                                });
                            });
                    };
                });
            });
        }





exports.delete=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err

        let id=req.params.id;
        connection.query("delete from data where id=?",[id],
        (err,rows)=>{
            connection.release();
            if(!err){
                res.redirect("/");
            }else{
                console.log(err);
            }
        }
        
        
        
        
        )
    })
}




       

