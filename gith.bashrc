function deployToProduction(){
    git checkout master
    git merge development
    git push server master
    git push origin master
    git checkout development
}


function dev(){
    git add .
    git commit -a -m "$*"
    git push server development
    git push origin development
}
