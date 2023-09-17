export default function NewCount(count){

    req.db.distinct()
    .from("data")
    .insert({"count": count})
    .then(_=> {
        return true
    })
    .catch(_=> {
        return false
    })

}