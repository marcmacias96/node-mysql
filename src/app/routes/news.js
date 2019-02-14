const dbConnection=require('../../config/dbConnection');
const request = require('superagent');
const  fs = require('fs');
const path = require('path');
var maestros,materias,cantNotas,sal="Hola pelado";
module.exports=app=>{
    const connection = dbConnection();
    
    function getJson(data){
        var obj = {
            table: []
         };
         for (let index = 0; index < data.length; index++) {
            obj.table.push({id: data[index].codigo_alum, nombre:data[index].nombre_alum,edad:data[index].edad_alum_sal});         
         }
         var json = JSON.stringify(obj);
         fs.writeFile(path.join(__dirname, '../views/news/data.json'), json, 'utf8', function callback(err,data){
            if(err)
            {
                console.log(error)
            }
         });
         
    }

    app.get('/',(req,res)=>{
        var res1=null, res2=null, res3=null,res4=null;
        
        connection.query('SELECT * FROM alum',(err,result)=>{
            res1 =result
            //getJson(res1);
            connection.query('SELECT * FROM materia',(err,result)=>{
                res2=result
                materias=result
                //console.log(result);
                
                connection.query('SELECT *FROM prof',(err,result)=>{
                    res3=result
                    maestros = result
                    connection.query(' SELECT alum.nombre_alum,materia.nombre_mat,nota.nota_not FROM nota INNER JOIN alum ON nota.codigo_alum = alum.codigo_alum INNER JOIN materia ON nota.codigo_mat = materia.codigo_mat;',(err,result)=>{                   
                        res4=result
                        cantNotas=result.length;                        
                        res.render("news/news",{alumnos:res1,materias:res2,profesores:res3,notas:res4})
                    })
                    
                })
            });
        })        
    }); 
    
     app.post('/datos', (req, res) => {
    const {codigo, nombre,edad, datos} = req.body;
    switch(datos) {
        case 'A':
            codigo_alum=codigo;
            nombre_alum=nombre; 
            edad_alum_sal=parseInt(edad,5);
            console.log(edad_alum_sal);            
            connection.query('INSERT INTO alum SET ? ',
            {
                codigo_alum,
                nombre_alum,
                edad_alum_sal
            }
        , (err, result) => {
            res.redirect('/');
        });
            
            break;
        case 'M':
            codigo_pro=codigo;
            nombre_pro=nombre; 
            edad_pro=parseInt(edad,5);;
            connection.query('INSERT INTO prof SET ? ',
            {
                codigo_pro,
                nombre_pro,
                edad_pro
            }
        , (err, result) => {
            res.redirect('/');
        });
            break;
        case 'MA':
        console.log('entro a materia');
            var codigo_mat=codigo;
            var nombre_mat=nombre;
            connection.query('INSERT INTO materia SET ? ',
            {
                codigo_mat,
                nombre_mat
            }
        , (err, result) => {
            res.redirect('/');
        });
            break;
        default:    
    } 
  });

  app.post('/notas',(req,res)=>{
    const {codigo,mats,prof,nota} = req.body;
    var codigo_not =cantNotas+1;
    var nota_not = parseInt(nota);
    var codigo_alum = codigo;
    var codigo_mat = busMat(mats);
    var codigo_pro = busProf(prof);
    connection.query('INSERT INTO nota SET ? ',
            {
                codigo_not,
                nota_not,
                codigo_alum,
                codigo_mat,
                codigo_pro
            }
        , (err, result) => {
            if(err) console.log(err);
            res.redirect('/');
        }); 
   });


}



function busMat(mat)
{
    
    for (let index = 0; index < materias.length; index++) {
        if(mat==materias[index].nombre_mat)
        {
            
            return materias[index].codigo_mat;
        }
        
    }
    
}

function busProf(prof)
{
    for (let index = 0; index < maestros.length; index++) {
        if(prof==maestros[index].nombre_pro)
        {
            console.log(maestros[index].codigo_pro);
            
            return maestros[index].codigo_pro;
        }
    }
    
}