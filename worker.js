
function color_picker()  {
  $default_color = '';
					if ( isset($value['std']) ) {
						if ( $val !=  $value['std'] )
							$default_color = ' data-default-color="' .$value['std'];
					}
					$output = '<input name="' . esc_attr( $option_name + [ $value['id'] ] ) + " id=" . esc_attr( $value['id'] ) . '" class="of-color"  type="text" value="' . esc_attr( $val ) . '"' . $default_color .' />';

					break;
}

function lol() {
  console.log("log")
}