# InputMask BRL
### Puglin jquery para definir mascara monetária brasileira.

## Dowloads e Documentação

* [Clone GitHub](https://github.com/gilmardeveloper/jquery-plugin-inputmask-brl.git)
* [Download ZIP](https://github.com/gilmardeveloper/jquery-plugin-inputmask-brl/archive/master.zip)

## CDN

   ```
   <script src="https://cdn.rawgit.com/gilmardeveloper/jquery-plugin-inputmask-brl/master/js/mask.js"></script>

   ```
## Dependência      

* [jQuery](https://jquery.com/download/)
* Google CDN

   ```
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

   ```

### Como usar                                                            

1. Sem símbolo
    
    ```
   <body>
    <input id="input-mask" type="text" />
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdn.rawgit.com/gilmardeveloper/jquery-plugin-inputmask-brl/master/js/mask.js"></script>
    
    <script>
        $(() => {
           $('#input-mask').mask();
        });
    </script>
  </body>
 

   ``` 
  
 2. Com símbolo
    
    ```
   <body>
    <input id="input-mask-1" data-symbol="R$" type="text" />
    <input id="input-mask-2" data-symbol="BRL" type="text" /> 
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdn.rawgit.com/gilmardeveloper/jquery-plugin-inputmask-brl/master/js/mask.js"></script>
    
    <script>
        $(() => {
           $('#input-mask-1').mask();
            $('#input-mask-2').mask();
        });
    </script>
  </body>
 

   ``` 



© 2017 Gilmar Carlos All rights reserved.

