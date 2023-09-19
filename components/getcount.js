function GetCount(){

    req.db.distinct()
    .from("data")
    .select("count")
    .then(count => {
        return count.pagecount
    })

}