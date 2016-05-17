/* global $ */
// defaults vars for api.method {wall.get}
var url = "https://api.vkontakte.ru/method/wall.get?";
var offset = 0;
var postsCount = 0;
var count  = 0;
var domain = "tabasov";
var old = {};

// get all posts
function getPosts(href) {
	if (href !== undefined) {
		$.ajax({
			url: href,
			dataType: "jsonp",
			success: function (data) {
				var posts = data.response;

				postsCount = posts.shift();
				parsePosts(posts);
			}
		});
	} else {
		$.ajax({
			url: url,
			dataType: "jsonp",
			data: {
				count: count,
				offset: offset,
				domain: domain
			},
			success: function (data) {
				var posts = data.response;

				postsCount = posts.shift();
				offset += 10;
				
				parsePosts(posts);
				paging(postsCount);
			}
		});	
	}
};
/**
 * @param  {any} data
 */
function parsePosts(data) {
	//debugger
	for (var i = 0; i < data.length; i++) {
		
		var id = data[i].id;
		if (!old[id]) {
			old[id] = true;
			
			var li = $('<li />');
			var p = $('<p class="text" />').html(data[i].text);
			var num = $('<i class="number" />').html(data[i].id);
			//debugger
			//var num = data[i].toString();

			p.appendTo(li);
			num.appendTo(p);
			
			li.appendTo($('#resultText'));
			
			var src =
				data[i].attachment
				&& data[i].attachment.photo
				&& data[i].attachment.photo.src
				&& data[i].attachment.photo.src_big;
				
			if (src) {
				var img = $('<img />').attr('src', data[i].attachment.photo.src);
				
				img.appendTo(li);
			}
		}
	}
};

function paging(count) {
	var pagination = $('.pagination');
	var visiblePosts = 10;
	var limit = postsCount / visiblePosts;
	var href = 'https://api.vkontakte.ru/method/wall.get?'
	
	var current_page;
	$('.pag').twbsPagination({
		initiateStartPageClick: false,
		totalPages: limit,
		visiblePages: visiblePosts, 
		paginationClass: 'pgn',
		prev: '&laquo; сюда',
		next: 'туда &raquo;',
		first: '&larr;',
		last: '&rarr;',
		onPageClick: function (event, page) {
			pageHrefBuilder();
		}
	});
	
	pageHrefBuilder();
	
	// shitcode
	function pageHrefBuilder () {
		var page = $('.page')
		$.each(page, function () {
			var t = $(this).find('a');
			var pageNumber = t.html();
			
			t.attr('href', href+'&count=10&offset='+pageNumber * 10+'&domain='+domain);
		});
		
		page.on('click', 'a', function () {
			var thatHref = $(this).attr('href'); 
			getPosts(thatHref);
		});
	}
}

$(function () {
	getPosts();
});