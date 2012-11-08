use Image::Magick;
my @images = <./*.png>;
my $im = new Image::Magick;
for my $image (@images) {
	    next if ($image eq "./grid.png");
	    $im->Read ($image);
}
# Make a row of the images
my $tile = scalar (@images) . "x1";
# Add eight pixels of space around each image.
my $output = $im->Montage (tile => $tile, tile => '1x', background => "transparent", gravity => "North");
$output->Write ("grid.png");
