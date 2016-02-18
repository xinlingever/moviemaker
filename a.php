<?php
function Orientation2String ($iOri) {
    $orientationArray = [
            "",
            "Horizontal (normal) ",
            "Mirror horizontal",
            "Rotate 180",
            "Mirror vertical",
            "Mirror horizontal and rotate 270 CW",
            "Rotate 90 CW",
            "Mirror horizontal and rotate 90 CW",
            "Rotate 270 CW"
        ];

    if($iOri >= 0 && $iOri < count($orientationArray)) {
        return $orientationArray[$iOri]; 
    }

    return "";
}

function Flash2String($iFlash) {
    $flashJson = '{"0x0" : "No Flash",
        "0x1" : "Fired",
        "0x5" : "Fired, Return not detected",
        "0x7" : "Fired, Return detected",
        "0x8" : "On, Did not fire",
        "0x9" : "On, Fired",
        "0xd" : "On, Return not detected",
        "0xf" : "On, Return detected",
        "0x10" : "Off, Did not fire",
        "0x14" : "Off, Did not fire, Return not detected",
        "0x18" : "Auto, Did not fire",
        "0x19" : "Auto, Fired",
        "0x1d" : "Auto, Fired, Return not detected",
        "0x1f" : "Auto, Fired, Return detected",
        "0x20" : "No flash function",
        "0x30" : "Off, No flash function",
        "0x41" : "Fired, Red-eye reduction",
        "0x45" : "Fired, Red-eye reduction, Return not detected",
        "0x47" : "Fired, Red-eye reduction, Return detected",
        "0x49" : "On, Red-eye reduction",
        "0x4d" : "On, Red-eye reduction, Return not detected",
        "0x4f" : "On, Red-eye reduction, Return detected",
        "0x50" : "Off, Red-eye reduction",
        "0x58" : "Auto, Did not fire, Red-eye reduction",
        "0x59" : "Auto, Fired, Red-eye reduction",
        "0x5d" : "Auto, Fired, Red-eye reduction, Return not detected",
        "0x5f" : "Auto, Fired, Red-eye reduction, Return detected"}';
    $flashDic = json_decode($flashJson);

    $flashHexKey = '0x'. dechex($iFlash);
    //echo $flashDic->{$flashHexKey}; 
    if($flashDic->{$flashHexKey}){
        return $flashDic->{$flashHexKey};
    }
    else{
        return "";
    }
}
# The tagnames can vary in different cameras

$imgdir = "./";
$img_file = "AAR_1799.jpg";

echo $img_file . "&nbsp;&nbsp;&nbsp;<sub>TEST</sub>
<br />";
echo '<img src="' . $imgdir . $img_file . '" alt="'
. $img_file . '" title="' . $img_file . '" width="400" /><br /><br />';

$xf_data = exif_read_data($imgdir . $img_file);

$tagIds = [
    0x10f,
    0x110,
    0x132,
    0xA002,
    0xA003,
    0x8827,
    0x9000,
    0x9004,
    0x9209
];

for($i = 0; $i < count($tagIds); $i++){
    $tagg = exif_tagname($tagIds[$i]);
    echo '<br>' . $tagg .  ' >>> ' . $xf_data[$tagg];

}
$tagg = exif_tagname(0X112);
$taggValue = $xf_data[$tagg];
echo '<br>' . $tagg .  ' >>> ' . Orientation2String((int) $taggValue );

echo '<img src="b.php?file=' . $img_file . '" />';

echo '<br>Flash >>> ' . Flash2String(16);
?>
