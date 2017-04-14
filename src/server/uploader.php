<?php 

// Required for image resizing
require_once('ImageTool.php');

// This will be the endpoint for uploading files

header("Access-Control-Allow-Origin: *");
if(!isset($_POST)){
	die('Wrong method');
}
function normal_chars($string) {
	$string = htmlentities($string, ENT_QUOTES, 'UTF-8');
	$string = preg_replace('~&([a-z]{1,2})(acute|cedil|circ|grave|lig|orn|ring|slash|th|tilde|uml);~i', '$1', $string);
	$string = html_entity_decode($string, ENT_QUOTES, 'UTF-8');
	$string = preg_replace(array('~[^0-9a-z]~i', '~[ -]+~'), ' ', $string);

	return trim($string, ' -');
}

try {

	// Undefined | Multiple Files | $_FILES Corruption Attack
	// If this request falls under any of them, treat it invalid.
	if (!isset($_FILES['file_upload']['error']) || is_array($_FILES['file_upload']['error']) ) {
		throw new RuntimeException('Invalid parameters.');
	}
	// Check $_FILES['file_upload']['error'] value.
	switch ($_FILES['file_upload']['error']) {
		case UPLOAD_ERR_OK:
			break;
		case UPLOAD_ERR_NO_FILE:
			throw new RuntimeException('No file sent.');
		case UPLOAD_ERR_INI_SIZE:
		case UPLOAD_ERR_FORM_SIZE:
			throw new RuntimeException('Exceeded filesize limit.');
		default:
			throw new RuntimeException('Unknown errors.');
	}

	// You should also check filesize here.
	if ($_FILES['file_upload']['size'] > 2097152) {
		throw new RuntimeException('Exceeded filesize limit.');
	}

	// DO NOT TRUST $_FILES['file_upload']['mime'] VALUE !!
	// Check MIME Type by yourself.
	$finfo = new finfo(FILEINFO_MIME_TYPE);
	if (false === $ext = array_search(
		$finfo->file($_FILES['file_upload']['tmp_name']),
		array(
			'jpg' => 'image/jpeg',
			'png' => 'image/png',
			'gif' => 'image/gif',
		),
		true
	)) {
		throw new RuntimeException('Invalid file format.');
	}
	$file = $_FILES['file_upload'];

	$safe_name = normal_chars($file['name']);
	// You should name it uniquely.
	// DO NOT USE $_FILES['file_upload']['name'] WITHOUT ANY VALIDATION !!
	// On this example, obtain safe unique name from its binary data.
	$sizes = array(
		array('width'=>280,'height'=>200) //thumb detail
		// array('width'=>120,'height'=>120), //bill & carrito
		// array('width'=>200,'height'=>220), //Categories
		// array('width'=>215,'height'=>255), //Home slider
		// array('width'=>250,'height'=>250), // Home
		// array('width'=>300,'height'=>350), // Home featured
		// array('width'=>500,'height'=>450)//, //Detail full
	);

	$upload_folder = "../../public/uploads/";
	$upload_public = "uploads/";
	$file_name = "original";
	$folder = md5(date("Ymdhis",time()).rand(0,1000));
	$file_ext = ".".pathinfo($file['name'], PATHINFO_EXTENSION);

	if(mkdir($upload_folder.$folder)){
		$upload_folder = $upload_folder.$folder."/";
		$upload_public = $upload_public.$folder."/";
		$url = $upload_folder.$file_name.$file_ext;
		if (move_uploaded_file($file['tmp_name'], $url)) {
			foreach($sizes as $size){
				$width = $size['width'];
				$height = $size['height'];
				$status = ImageTool::resize(array(
					'input' => $url,
					'output' => $upload_folder.$width."x".$height.$file_ext,
					'width' => $width,
					'height' => $height
				)); //returns true if successful and false if unsucessful
			}
			$photo = array(
				'Photo'=>array(
							'name' => $safe_name,
							'path' => $upload_public,
							'type' => $file['type'],
						)
					);
		}
		else {
			throw new RuntimeException('Failed to move uploaded file.');
		}
	}
	else {
		throw new RuntimeException('Failed to create folder');
	}
	// All is well, return answer
	echo json_encode(['success' => 'success', 'code' => 200, 'shot' => [
		'prettyname' => $safe_name,
		'img' => $upload_public.$file_name.$file_ext,
		'thumb' => $upload_public.'280x200'.$file_ext, /* TODO: resize img */
		]]);
	exit();

} catch (RuntimeException $e) {
	echo $e->getMessage();
}
