(function(){
/*!
 * jQuery 1.2.6 - New Wave Javascript
 *
 * Copyright (c) 2008 John Resig (jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2008-05-24 14:22:17 -0400 (Sat, 24 May 2008) $
 * $Rev: 5685 $
 */

// Map over jQuery in case of overwrite
var _jQuery = window.jQuery,
// Map over the $ in case of overwrite
	_$ = window.$;

var jQuery = window.jQuery = window.$ = function( selector, context ) {
	// The jQuery object is actually just the init constructor 'enhanced'
	return new jQuery.fn.init( selector, context );
};

// A simple way to check for HTML strings or ID strings
// (both of which we optimize for)
var quickExpr = /^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/,

// Is it a simple selector
	isSimple = /^.[^:#\[\.]*$/,

// Will speed up references to undefined, and allows munging its name.
	undefined;

jQuery.fn = jQuery.prototype = {
	init: function( selector, context ) {
		// Make sure that a selection was provided
		selector = selector || document;

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this[0] = selector;
			this.length = 1;
			return this;
		}
		// Handle HTML strings
		if ( typeof selector == "string" ) {
			// Are we dealing with HTML string or an ID?
			var match = quickExpr.exec( selector );

			// Verify a match, and that no context was specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] )
					selector = jQuery.clean( [ match[1] ], context );

				// HANDLE: $("#id")
				else {
					var elem = document.getElementById( match[3] );

					// Make sure an element was located
					if ( elem ){
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id != match[3] )
							return jQuery().find( selector );

						// Otherwise, we inject the element directly into the jQuery object
						return jQuery( elem );
					}
					selector = [];
				}

			// HANDLE: $(expr, [context])
			// (which is just equivalent to: $(content).find(expr)
			} else
				return jQuery( context ).find( selector );

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) )
			return jQuery( document )[ jQuery.fn.ready ? "ready" : "load" ]( selector );

		return this.setArray(jQuery.makeArray(selector));
	},

	// The current version of jQuery being used
	jquery: "1.2.6",

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	// The number of elements contained in the matched element set
	length: 0,

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == undefined ?

			// Return a 'clean' array
			jQuery.makeArray( this ) :

			// Return just the object
			this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {
		// Build a new jQuery matched element set
		var ret = jQuery( elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Force the current matched set of elements to become
	// the specified array of elements (destroying the stack in the process)
	// You should use pushStack() in order to do this, but maintain the stack
	setArray: function( elems ) {
		// Resetting the length to 0, then using the native Array push
		// is a super-fast way to populate an object with array-like properties
		this.length = 0;
		Array.prototype.push.apply( this, elems );

		return this;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {
		var ret = -1;

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem && elem.jquery ? elem[0] : elem
		, this );
	},

	attr: function( name, value, type ) {
		var options = name;

		// Look for the case where we're accessing a style value
		if ( name.constructor == String )
			if ( value === undefined )
				return this[0] && jQuery[ type || "attr" ]( this[0], name );

			else {
				options = {};
				options[ name ] = value;
			}

		// Check to see if we're setting style values
		return this.each(function(i){
			// Set all the styles
			for ( name in options )
				jQuery.attr(
					type ?
						this.style :
						this,
					name, jQuery.prop( this, options[ name ], type, i, name )
				);
		});
	},

	css: function( key, value ) {
		// ignore negative width and height values
		if ( (key == 'width' || key == 'height') && parseFloat(value) < 0 )
			value = undefined;
		return this.attr( key, value, "curCSS" );
	},

	text: function( text ) {
		if ( typeof text != "object" && text != null )
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );

		var ret = "";

		jQuery.each( text || this, function(){
			jQuery.each( this.childNodes, function(){
				if ( this.nodeType != 8 )
					ret += this.nodeType != 1 ?
						this.nodeValue :
						jQuery.fn.text( [ this ] );
			});
		});

		return ret;
	},

	wrapAll: function( html ) {
		if ( this[0] )
			// The elements to wrap the target around
			jQuery( html, this[0].ownerDocument )
				.clone()
				.insertBefore( this[0] )
				.map(function(){
					var elem = this;

					while ( elem.firstChild )
						elem = elem.firstChild;

					return elem;
				})
				.append(this);

		return this;
	},

	wrapInner: function( html ) {
		return this.each(function(){
			jQuery( this ).contents().wrapAll( html );
		});
	},

	wrap: function( html ) {
		return this.each(function(){
			jQuery( this ).wrapAll( html );
		});
	},

	append: function() {
		return this.domManip(arguments, true, false, function(elem){
			if (this.nodeType == 1)
				this.appendChild( elem );
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, true, function(elem){
			if (this.nodeType == 1)
				this.insertBefore( elem, this.firstChild );
		});
	},

	before: function() {
		return this.domManip(arguments, false, false, function(elem){
			this.parentNode.insertBefore( elem, this );
		});
	},

	after: function() {
		return this.domManip(arguments, false, true, function(elem){
			this.parentNode.insertBefore( elem, this.nextSibling );
		});
	},

	end: function() {
		return this.prevObject || jQuery( [] );
	},

	find: function( selector ) {
		var elems = jQuery.map(this, function(elem){
			return jQuery.find( selector, elem );
		});

		return this.pushStack( /[^+>] [^+>]/.test( selector ) || selector.indexOf("..") > -1 ?
			jQuery.unique( elems ) :
			elems );
	},

	clone: function( events ) {
		// Do the clone
		var ret = this.map(function(){
			if ( jQuery.browser.msie && !jQuery.isXMLDoc(this) ) {
				// IE copies events bound via attachEvent when
				// using cloneNode. Calling detachEvent on the
				// clone will also remove the events from the orignal
				// In order to get around this, we use innerHTML.
				// Unfortunately, this means some modifications to
				// attributes in IE that are actually only stored
				// as properties will not be copied (such as the
				// the name attribute on an input).
				var clone = this.cloneNode(true),
					container = document.createElement("div");
				container.appendChild(clone);
				return jQuery.clean([container.innerHTML])[0];
			} else
				return this.cloneNode(true);
		});

		// Need to set the expando to null on the cloned set if it exists
		// removeData doesn't work here, IE removes it from the original as well
		// this is primarily for IE but the data expando shouldn't be copied over in any browser
		var clone = ret.find("*").andSelf().each(function(){
			if ( this[ expando ] != undefined )
				this[ expando ] = null;
		});

		// Copy the events from the original to the clone
		if ( events === true )
			this.find("*").andSelf().each(function(i){
				if (this.nodeType == 3)
					return;
				var events = jQuery.data( this, "events" );

				for ( var type in events )
					for ( var handler in events[ type ] )
						jQuery.event.add( clone[ i ], type, events[ type ][ handler ], events[ type ][ handler ].data );
			});

		// Return the cloned set
		return ret;
	},

	filter: function( selector ) {
		return this.pushStack(
			jQuery.isFunction( selector ) &&
			jQuery.grep(this, function(elem, i){
				return selector.call( elem, i );
			}) ||

			jQuery.multiFilter( selector, this ) );
	},

	not: function( selector ) {
		if ( selector.constructor == String )
			// test special case where just one selector is passed in
			if ( isSimple.test( selector ) )
				return this.pushStack( jQuery.multiFilter( selector, this, true ) );
			else
				selector = jQuery.multiFilter( selector, this );

		var isArrayLike = selector.length && selector[selector.length - 1] !== undefined && !selector.nodeType;
		return this.filter(function() {
			return isArrayLike ? jQuery.inArray( this, selector ) < 0 : this != selector;
		});
	},

	add: function( selector ) {
		return this.pushStack( jQuery.unique( jQuery.merge(
			this.get(),
			typeof selector == 'string' ?
				jQuery( selector ) :
				jQuery.makeArray( selector )
		)));
	},

	is: function( selector ) {
		return !!selector && jQuery.multiFilter( selector, this ).length > 0;
	},

	hasClass: function( selector ) {
		return this.is( "." + selector );
	},

	val: function( value ) {
		if ( value == undefined ) {

			if ( this.length ) {
				var elem = this[0];

				// We need to handle select boxes special
				if ( jQuery.nodeName( elem, "select" ) ) {
					var index = elem.selectedIndex,
						values = [],
						options = elem.options,
						one = elem.type == "select-one";

					// Nothing was selected
					if ( index < 0 )
						return null;

					// Loop through all the selected options
					for ( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ ) {
						var option = options[ i ];

						if ( option.selected ) {
							// Get the specifc value for the option
							value = jQuery.browser.msie && !option.attributes.value.specified ? option.text : option.value;

							// We don't need an array for one selects
							if ( one )
								return value;

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;

				// Everything else, we just grab the value
				} else
					return (this[0].value || "").replace(/\r/g, "");

			}

			return undefined;
		}

		if( value.constructor == Number )
			value += '';

		return this.each(function(){
			if ( this.nodeType != 1 )
				return;

			if ( value.constructor == Array && /radio|checkbox/.test( this.type ) )
				this.checked = (jQuery.inArray(this.value, value) >= 0 ||
					jQuery.inArray(this.name, value) >= 0);

			else if ( jQuery.nodeName( this, "select" ) ) {
				var values = jQuery.makeArray(value);

				jQuery( "option", this ).each(function(){
					this.selected = (jQuery.inArray( this.value, values ) >= 0 ||
						jQuery.inArray( this.text, values ) >= 0);
				});

				if ( !values.length )
					this.selectedIndex = -1;

			} else
				this.value = value;
		});
	},

	html: function( value ) {
		return value == undefined ?
			(this[0] ?
				this[0].innerHTML :
				null) :
			this.empty().append( value );
	},

	replaceWith: function( value ) {
		return this.after( value ).remove();
	},

	eq: function( i ) {
		return this.slice( i, i + 1 );
	},

	slice: function() {
		return this.pushStack( Array.prototype.slice.apply( this, arguments ) );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function(elem, i){
			return callback.call( elem, i, elem );
		}));
	},

	andSelf: function() {
		return this.add( this.prevObject );
	},

	data: function( key, value ){
		var parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			var data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			if ( data === undefined && this.length )
				data = jQuery.data( this[0], key );

			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;
		} else
			return this.trigger("setData" + parts[1] + "!", [parts[0], value]).each(function(){
				jQuery.data( this, key, value );
			});
	},

	removeData: function( key ){
		return this.each(function(){
			jQuery.removeData( this, key );
		});
	},

	domManip: function( args, table, reverse, callback ) {
		var clone = this.length > 1, elems;

		return this.each(function(){
			if ( !elems ) {
				elems = jQuery.clean( args, this.ownerDocument );

				if ( reverse )
					elems.reverse();
			}

			var obj = this;

			if ( table && jQuery.nodeName( this, "table" ) && jQuery.nodeName( elems[0], "tr" ) )
				obj = this.getElementsByTagName("tbody")[0] || this.appendChild( this.ownerDocument.createElement("tbody") );

			var scripts = jQuery( [] );

			jQuery.each(elems, function(){
				var elem = clone ?
					jQuery( this ).clone( true )[0] :
					this;

				// execute all scripts after the elements have been injected
				if ( jQuery.nodeName( elem, "script" ) )
					scripts = scripts.add( elem );
				else {
					// Remove any inner scripts for later evaluation
					if ( elem.nodeType == 1 )
						scripts = scripts.add( jQuery( "script", elem ).remove() );

					// Inject the elements into the document
					callback.call( obj, elem );
				}
			});

			scripts.each( evalScript );
		});
	}
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

function evalScript( i, elem ) {
	if ( elem.src )
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});

	else
		jQuery.globalEval( elem.text || elem.textContent || elem.innerHTML || "" );

	if ( elem.parentNode )
		elem.parentNode.removeChild( elem );
}

function now(){
	return +new Date;
}

jQuery.extend = jQuery.fn.extend = function() {
	// copy reference to target object
	var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;

	// Handle a deep copy situation
	if ( target.constructor == Boolean ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target != "object" && typeof target != "function" )
		target = {};

	// extend jQuery itself if only one argument is passed
	if ( length == i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ )
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null )
			// Extend the base object
			for ( var name in options ) {
				var src = target[ name ], copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy )
					continue;

				// Recurse if we're merging object values
				if ( deep && copy && typeof copy == "object" && !copy.nodeType )
					target[ name ] = jQuery.extend( deep, 
						// Never move original objects, clone them
						src || ( copy.length != null ? [ ] : { } )
					, copy );

				// Don't bring in undefined values
				else if ( copy !== undefined )
					target[ name ] = copy;

			}

	// Return the modified object
	return target;
};

var expando = "jQuery" + now(), uuid = 0, windowData = {},
	// exclude the following css properties to add px
	exclude = /z-?index|font-?weight|opacity|zoom|line-?height/i,
	// cache defaultView
	defaultView = document.defaultView || {};

jQuery.extend({
	noConflict: function( deep ) {
		window.$ = _$;

		if ( deep )
			window.jQuery = _jQuery;

		return jQuery;
	},

	// See test/unit/core.js for details concerning this function.
	isFunction: function( fn ) {
		return !!fn && typeof fn != "string" && !fn.nodeName &&
			fn.constructor != Array && /^[\s[]?function/.test( fn + "" );
	},

	// check if an element is in a (or is an) XML document
	isXMLDoc: function( elem ) {
		return elem.documentElement && !elem.body ||
			elem.tagName && elem.ownerDocument && !elem.ownerDocument.body;
	},

	// Evalulates a script in a global context
	globalEval: function( data ) {
		data = jQuery.trim( data );

		if ( data ) {
			// Inspired by code by Andrea Giammarchi
			// http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
			var head = document.getElementsByTagName("head")[0] || document.documentElement,
				script = document.createElement("script");

			script.type = "text/javascript";
			if ( jQuery.browser.msie )
				script.text = data;
			else
				script.appendChild( document.createTextNode( data ) );

			// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
			// This arises when a base node is used (#2709).
			head.insertBefore( script, head.firstChild );
			head.removeChild( script );
		}
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() == name.toUpperCase();
	},

	cache: {},

	data: function( elem, name, data ) {
		elem = elem == window ?
			windowData :
			elem;

		var id = elem[ expando ];

		// Compute a unique ID for the element
		if ( !id )
			id = elem[ expando ] = ++uuid;

		// Only generate the data cache if we're
		// trying to access or manipulate it
		if ( name && !jQuery.cache[ id ] )
			jQuery.cache[ id ] = {};

		// Prevent overriding the named cache with undefined values
		if ( data !== undefined )
			jQuery.cache[ id ][ name ] = data;

		// Return the named cache data, or the ID for the element
		return name ?
			jQuery.cache[ id ][ name ] :
			id;
	},

	removeData: function( elem, name ) {
		elem = elem == window ?
			windowData :
			elem;

		var id = elem[ expando ];

		// If we want to remove a specific section of the element's data
		if ( name ) {
			if ( jQuery.cache[ id ] ) {
				// Remove the section of cache data
				delete jQuery.cache[ id ][ name ];

				// If we've removed all the data, remove the element's cache
				name = "";

				for ( name in jQuery.cache[ id ] )
					break;

				if ( !name )
					jQuery.removeData( elem );
			}

		// Otherwise, we want to remove all of the element's data
		} else {
			// Clean up the element expando
			try {
				delete elem[ expando ];
			} catch(e){
				// IE has trouble directly removing the expando
				// but it's ok with using removeAttribute
				if ( elem.removeAttribute )
					elem.removeAttribute( expando );
			}

			// Completely remove the data cache
			delete jQuery.cache[ id ];
		}
	},

	// args is for internal usage only
	each: function( object, callback, args ) {
		var name, i = 0, length = object.length;

		if ( args ) {
			if ( length == undefined ) {
				for ( name in object )
					if ( callback.apply( object[ name ], args ) === false )
						break;
			} else
				for ( ; i < length; )
					if ( callback.apply( object[ i++ ], args ) === false )
						break;

		// A special, fast, case for the most common use of each
		} else {
			if ( length == undefined ) {
				for ( name in object )
					if ( callback.call( object[ name ], name, object[ name ] ) === false )
						break;
			} else
				for ( var value = object[0];
					i < length && callback.call( value, i, value ) !== false; value = object[++i] ){}
		}

		return object;
	},

	prop: function( elem, value, type, i, name ) {
		// Handle executable functions
		if ( jQuery.isFunction( value ) )
			value = value.call( elem, i );

		// Handle passing in a number to a CSS property
		return value && value.constructor == Number && type == "curCSS" && !exclude.test( name ) ?
			value + "px" :
			value;
	},

	className: {
		// internal only, use addClass("class")
		add: function( elem, classNames ) {
			jQuery.each((classNames || "").split(/\s+/), function(i, className){
				if ( elem.nodeType == 1 && !jQuery.className.has( elem.className, className ) )
					elem.className += (elem.className ? " " : "") + className;
			});
		},

		// internal only, use removeClass("class")
		remove: function( elem, classNames ) {
			if (elem.nodeType == 1)
				elem.className = classNames != undefined ?
					jQuery.grep(elem.className.split(/\s+/), function(className){
						return !jQuery.className.has( classNames, className );
					}).join(" ") :
					"";
		},

		// internal only, use hasClass("class")
		has: function( elem, className ) {
			return jQuery.inArray( className, (elem.className || elem).toString().split(/\s+/) ) > -1;
		}
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var old = {};
		// Remember the old values, and insert the new ones
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		// Revert the old values
		for ( var name in options )
			elem.style[ name ] = old[ name ];
	},

	css: function( elem, name, force ) {
		if ( name == "width" || name == "height" ) {
			var val, props = { position: "absolute", visibility: "hidden", display:"block" }, which = name == "width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ];

			function getWH() {
				val = name == "width" ? elem.offsetWidth : elem.offsetHeight;
				var padding = 0, border = 0;
				jQuery.each( which, function() {
					padding += parseFloat(jQuery.curCSS( elem, "padding" + this, true)) || 0;
					border += parseFloat(jQuery.curCSS( elem, "border" + this + "Width", true)) || 0;
				});
				val -= Math.round(padding + border);
			}

			if ( jQuery(elem).is(":visible") )
				getWH();
			else
				jQuery.swap( elem, props, getWH );

			return Math.max(0, val);
		}

		return jQuery.curCSS( elem, name, force );
	},

	curCSS: function( elem, name, force ) {
		var ret, style = elem.style;

		// A helper method for determining if an element's values are broken
		function color( elem ) {
			if ( !jQuery.browser.safari )
				return false;

			// defaultView is cached
			var ret = defaultView.getComputedStyle( elem, null );
			return !ret || ret.getPropertyValue("color") == "";
		}

		// We need to handle opacity special in IE
		if ( name == "opacity" && jQuery.browser.msie ) {
			ret = jQuery.attr( style, "opacity" );

			return ret == "" ?
				"1" :
				ret;
		}
		// Opera sometimes will give the wrong display answer, this fixes it, see #2037
		if ( jQuery.browser.opera && name == "display" ) {
			var save = style.outline;
			style.outline = "0 solid black";
			style.outline = save;
		}

		// Make sure we're using the right name for getting the float value
		if ( name.match( /float/i ) )
			name = styleFloat;

		if ( !force && style && style[ name ] )
			ret = style[ name ];

		else if ( defaultView.getComputedStyle ) {

			// Only "float" is needed here
			if ( name.match( /float/i ) )
				name = "float";

			name = name.replace( /([A-Z])/g, "-$1" ).toLowerCase();

			var computedStyle = defaultView.getComputedStyle( elem, null );

			if ( computedStyle && !color( elem ) )
				ret = computedStyle.getPropertyValue( name );

			// If the element isn't reporting its values properly in Safari
			// then some display: none elements are involved
			else {
				var swap = [], stack = [], a = elem, i = 0;

				// Locate all of the parent display: none elements
				for ( ; a && color(a); a = a.parentNode )
					stack.unshift(a);

				// Go through and make them visible, but in reverse
				// (It would be better if we knew the exact display type that they had)
				for ( ; i < stack.length; i++ )
					if ( color( stack[ i ] ) ) {
						swap[ i ] = stack[ i ].style.display;
						stack[ i ].style.display = "block";
					}

				// Since we flip the display style, we have to handle that
				// one special, otherwise get the value
				ret = name == "display" && swap[ stack.length - 1 ] != null ?
					"none" :
					( computedStyle && computedStyle.getPropertyValue( name ) ) || "";

				// Finally, revert the display styles back
				for ( i = 0; i < swap.length; i++ )
					if ( swap[ i ] != null )
						stack[ i ].style.display = swap[ i ];
			}

			// We should always get a number back from opacity
			if ( name == "opacity" && ret == "" )
				ret = "1";

		} else if ( elem.currentStyle ) {
			var camelCase = name.replace(/\-(\w)/g, function(all, letter){
				return letter.toUpperCase();
			});

			ret = elem.currentStyle[ name ] || elem.currentStyle[ camelCase ];

			// From the awesome hack by Dean Edwards
			// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

			// If we're not dealing with a regular pixel number
			// but a number that has a weird ending, we need to convert it to pixels
			if ( !/^\d+(px)?$/i.test( ret ) && /^\d/.test( ret ) ) {
				// Remember the original values
				var left = style.left, rsLeft = elem.runtimeStyle.left;

				// Put in the new values to get a computed value out
				elem.runtimeStyle.left = elem.currentStyle.left;
				style.left = ret || 0;
				ret = style.pixelLeft + "px";

				// Revert the changed values
				style.left = left;
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret;
	},

	clean: function( elems, context ) {
		var ret = [];
		context = context || document;
		// !context.createElement fails in IE with an error but returns typeof 'object'
		if (typeof context.createElement == 'undefined')
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;

		jQuery.each(elems, function(i, elem){
			if ( !elem )
				return;

			if ( elem.constructor == Number )
				elem += '';

			// Convert html string into DOM nodes
			if ( typeof elem == "string" ) {
				// Fix "XHTML"-style tags in all browsers
				elem = elem.replace(/(<(\w+)[^>]*?)\/>/g, function(all, front, tag){
					return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ?
						all :
						front + "></" + tag + ">";
				});

				// Trim whitespace, otherwise indexOf won't work as expected
				var tags = jQuery.trim( elem ).toLowerCase(), div = context.createElement("div");

				var wrap =
					// option or optgroup
					!tags.indexOf("<opt") &&
					[ 1, "<select multiple='multiple'>", "</select>" ] ||

					!tags.indexOf("<leg") &&
					[ 1, "<fieldset>", "</fieldset>" ] ||

					tags.match(/^<(thead|tbody|tfoot|colg|cap)/) &&
					[ 1, "<table>", "</table>" ] ||

					!tags.indexOf("<tr") &&
					[ 2, "<table><tbody>", "</tbody></table>" ] ||

				 	// <thead> matched above
					(!tags.indexOf("<td") || !tags.indexOf("<th")) &&
					[ 3, "<table><tbody><tr>", "</tr></tbody></table>" ] ||

					!tags.indexOf("<col") &&
					[ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ] ||

					// IE can't serialize <link> and <script> tags normally
					jQuery.browser.msie &&
					[ 1, "div<div>", "</div>" ] ||

					[ 0, "", "" ];

				// Go to html and back, then peel off extra wrappers
				div.innerHTML = wrap[1] + elem + wrap[2];

				// Move to the right depth
				while ( wrap[0]-- )
					div = div.lastChild;

				// Remove IE's autoinserted <tbody> from table fragments
				if ( jQuery.browser.msie ) {

					// String was a <table>, *may* have spurious <tbody>
					var tbody = !tags.indexOf("<table") && tags.indexOf("<tbody") < 0 ?
						div.firstChild && div.firstChild.childNodes :

						// String was a bare <thead> or <tfoot>
						wrap[1] == "<table>" && tags.indexOf("<tbody") < 0 ?
							div.childNodes :
							[];

					for ( var j = tbody.length - 1; j >= 0 ; --j )
						if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length )
							tbody[ j ].parentNode.removeChild( tbody[ j ] );

					// IE completely kills leading whitespace when innerHTML is used
					if ( /^\s/.test( elem ) )
						div.insertBefore( context.createTextNode( elem.match(/^\s*/)[0] ), div.firstChild );

				}

				elem = jQuery.makeArray( div.childNodes );
			}

			if ( elem.length === 0 && (!jQuery.nodeName( elem, "form" ) && !jQuery.nodeName( elem, "select" )) )
				return;

			if ( elem[0] == undefined || jQuery.nodeName( elem, "form" ) || elem.options )
				ret.push( elem );

			else
				ret = jQuery.merge( ret, elem );

		});

		return ret;
	},

	attr: function( elem, name, value ) {
		// don't set attributes on text and comment nodes
		if (!elem || elem.nodeType == 3 || elem.nodeType == 8)
			return undefined;

		var notxml = !jQuery.isXMLDoc( elem ),
			// Whether we are setting (or getting)
			set = value !== undefined,
			msie = jQuery.browser.msie;

		// Try to normalize/fix the name
		name = notxml && jQuery.props[ name ] || name;

		// Only do all the following if this is a node (faster for style)
		// IE elem.getAttribute passes even for style
		if ( elem.tagName ) {

			// These attributes require special treatment
			var special = /href|src|style/.test( name );

			// Safari mis-reports the default selected property of a hidden option
			// Accessing the parent's selectedIndex property fixes it
			if ( name == "selected" && jQuery.browser.safari )
				elem.parentNode.selectedIndex;

			// If applicable, access the attribute via the DOM 0 way
			if ( name in elem && notxml && !special ) {
				if ( set ){
					// We can't allow the type property to be changed (since it causes problems in IE)
					if ( name == "type" && jQuery.nodeName( elem, "input" ) && elem.parentNode )
						throw "type property can't be changed";

					elem[ name ] = value;
				}

				// browsers index elements by id/name on forms, give priority to attributes.
				if( jQuery.nodeName( elem, "form" ) && elem.getAttributeNode(name) )
					return elem.getAttributeNode( name ).nodeValue;

				return elem[ name ];
			}

			if ( msie && notxml &&  name == "style" )
				return jQuery.attr( elem.style, "cssText", value );

			if ( set )
				// convert the value to a string (all browsers do this but IE) see #1070
				elem.setAttribute( name, "" + value );

			var attr = msie && notxml && special
					// Some attributes require a special call on IE
					? elem.getAttribute( name, 2 )
					: elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return attr === null ? undefined : attr;
		}

		// elem is actually elem.style ... set the style

		// IE uses filters for opacity
		if ( msie && name == "opacity" ) {
			if ( set ) {
				// IE has trouble with opacity if it does not have layout
				// Force it by setting the zoom level
				elem.zoom = 1;

				// Set the alpha filter to set the opacity
				elem.filter = (elem.filter || "").replace( /alpha\([^)]*\)/, "" ) +
					(parseInt( value ) + '' == "NaN" ? "" : "alpha(opacity=" + value * 100 + ")");
			}

			return elem.filter && elem.filter.indexOf("opacity=") >= 0 ?
				(parseFloat( elem.filter.match(/opacity=([^)]*)/)[1] ) / 100) + '':
				"";
		}

		name = name.replace(/-([a-z])/ig, function(all, letter){
			return letter.toUpperCase();
		});

		if ( set )
			elem[ name ] = value;

		return elem[ name ];
	},

	trim: function( text ) {
		return (text || "").replace( /^\s+|\s+$/g, "" );
	},

	makeArray: function( array ) {
		var ret = [];

		if( array != null ){
			var i = array.length;
			//the window, strings and functions also have 'length'
			if( i == null || array.split || array.setInterval || array.call )
				ret[0] = array;
			else
				while( i )
					ret[--i] = array[i];
		}

		return ret;
	},

	inArray: function( elem, array ) {
		for ( var i = 0, length = array.length; i < length; i++ )
		// Use === because on IE, window == document
			if ( array[ i ] === elem )
				return i;

		return -1;
	},

	merge: function( first, second ) {
		// We have to loop this way because IE & Opera overwrite the length
		// expando of getElementsByTagName
		var i = 0, elem, pos = first.length;
		// Also, we need to make sure that the correct elements are being returned
		// (IE returns comment nodes in a '*' query)
		if ( jQuery.browser.msie ) {
			while ( elem = second[ i++ ] )
				if ( elem.nodeType != 8 )
					first[ pos++ ] = elem;

		} else
			while ( elem = second[ i++ ] )
				first[ pos++ ] = elem;

		return first;
	},

	unique: function( array ) {
		var ret = [], done = {};

		try {

			for ( var i = 0, length = array.length; i < length; i++ ) {
				var id = jQuery.data( array[ i ] );

				if ( !done[ id ] ) {
					done[ id ] = true;
					ret.push( array[ i ] );
				}
			}

		} catch( e ) {
			ret = array;
		}

		return ret;
	},

	grep: function( elems, callback, inv ) {
		var ret = [];

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, length = elems.length; i < length; i++ )
			if ( !inv != !callback( elems[ i ], i ) )
				ret.push( elems[ i ] );

		return ret;
	},

	map: function( elems, callback ) {
		var ret = [];

		// Go through the array, translating each of the items to their
		// new value (or values).
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			var value = callback( elems[ i ], i );

			if ( value != null )
				ret[ ret.length ] = value;
		}

		return ret.concat.apply( [], ret );
	}
});

var userAgent = navigator.userAgent.toLowerCase();

// Figure out what browser is being used
jQuery.browser = {
	version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1],
	safari: /webkit/.test( userAgent ),
	opera: /opera/.test( userAgent ),
	msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
	mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
};

var styleFloat = jQuery.browser.msie ?
	"styleFloat" :
	"cssFloat";

jQuery.extend({
	// Check to see if the W3C box model is being used
	boxModel: !jQuery.browser.msie || document.compatMode == "CSS1Compat",

	props: {
		"for": "htmlFor",
		"class": "className",
		"float": styleFloat,
		cssFloat: styleFloat,
		styleFloat: styleFloat,
		readonly: "readOnly",
		maxlength: "maxLength",
		cellspacing: "cellSpacing"
	}
});

jQuery.each({
	parent: function(elem){return elem.parentNode;},
	parents: function(elem){return jQuery.dir(elem,"parentNode");},
	next: function(elem){return jQuery.nth(elem,2,"nextSibling");},
	prev: function(elem){return jQuery.nth(elem,2,"previousSibling");},
	nextAll: function(elem){return jQuery.dir(elem,"nextSibling");},
	prevAll: function(elem){return jQuery.dir(elem,"previousSibling");},
	siblings: function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},
	children: function(elem){return jQuery.sibling(elem.firstChild);},
	contents: function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}
}, function(name, fn){
	jQuery.fn[ name ] = function( selector ) {
		var ret = jQuery.map( this, fn );

		if ( selector && typeof selector == "string" )
			ret = jQuery.multiFilter( selector, ret );

		return this.pushStack( jQuery.unique( ret ) );
	};
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function(name, original){
	jQuery.fn[ name ] = function() {
		var args = arguments;

		return this.each(function(){
			for ( var i = 0, length = args.length; i < length; i++ )
				jQuery( args[ i ] )[ original ]( this );
		});
	};
});

jQuery.each({
	removeAttr: function( name ) {
		jQuery.attr( this, name, "" );
		if (this.nodeType == 1)
			this.removeAttribute( name );
	},

	addClass: function( classNames ) {
		jQuery.className.add( this, classNames );
	},

	removeClass: function( classNames ) {
		jQuery.className.remove( this, classNames );
	},

	toggleClass: function( classNames ) {
		jQuery.className[ jQuery.className.has( this, classNames ) ? "remove" : "add" ]( this, classNames );
	},

	remove: function( selector ) {
		if ( !selector || jQuery.filter( selector, [ this ] ).r.length ) {
			// Prevent memory leaks
			jQuery( "*", this ).add(this).each(function(){
				jQuery.event.remove(this);
				jQuery.removeData(this);
			});
			if (this.parentNode)
				this.parentNode.removeChild( this );
		}
	},

	empty: function() {
		// Remove element nodes and prevent memory leaks
		jQuery( ">*", this ).remove();

		// Remove any remaining nodes
		while ( this.firstChild )
			this.removeChild( this.firstChild );
	}
}, function(name, fn){
	jQuery.fn[ name ] = function(){
		return this.each( fn, arguments );
	};
});

jQuery.each([ "Height", "Width" ], function(i, name){
	var type = name.toLowerCase();

	jQuery.fn[ type ] = function( size ) {
		// Get window width or height
		return this[0] == window ?
			// Opera reports document.body.client[Width/Height] properly in both quirks and standards
			jQuery.browser.opera && document.body[ "client" + name ] ||

			// Safari reports inner[Width/Height] just fine (Mozilla and Opera include scroll bar widths)
			jQuery.browser.safari && window[ "inner" + name ] ||

			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
			document.compatMode == "CSS1Compat" && document.documentElement[ "client" + name ] || document.body[ "client" + name ] :

			// Get document width or height
			this[0] == document ?
				// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
				Math.max(
					Math.max(document.body["scroll" + name], document.documentElement["scroll" + name]),
					Math.max(document.body["offset" + name], document.documentElement["offset" + name])
				) :

				// Get or set width or height on the element
				size == undefined ?
					// Get width or height on the element
					(this.length ? jQuery.css( this[0], type ) : null) :

					// Set the width or height on the element (default to pixels if value is unitless)
					this.css( type, size.constructor == String ? size : size + "px" );
	};
});

// Helper function used by the dimensions and offset modules
function num(elem, prop) {
	return elem[0] && parseInt( jQuery.curCSS(elem[0], prop, true), 10 ) || 0;
}var chars = jQuery.browser.safari && parseInt(jQuery.browser.version) < 417 ?
		"(?:[\\w*_-]|\\\\.)" :
		"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",
	quickChild = new RegExp("^>\\s*(" + chars + "+)"),
	quickID = new RegExp("^(" + chars + "+)(#)(" + chars + "+)"),
	quickClass = new RegExp("^([#.]?)(" + chars + "*)");

jQuery.extend({
	expr: {
		"": function(a,i,m){return m[2]=="*"||jQuery.nodeName(a,m[2]);},
		"#": function(a,i,m){return a.getAttribute("id")==m[2];},
		":": {
			// Position Checks
			lt: function(a,i,m){return i<m[3]-0;},
			gt: function(a,i,m){return i>m[3]-0;},
			nth: function(a,i,m){return m[3]-0==i;},
			eq: function(a,i,m){return m[3]-0==i;},
			first: function(a,i){return i==0;},
			last: function(a,i,m,r){return i==r.length-1;},
			even: function(a,i){return i%2==0;},
			odd: function(a,i){return i%2;},

			// Child Checks
			"first-child": function(a){return a.parentNode.getElementsByTagName("*")[0]==a;},
			"last-child": function(a){return jQuery.nth(a.parentNode.lastChild,1,"previousSibling")==a;},
			"only-child": function(a){return !jQuery.nth(a.parentNode.lastChild,2,"previousSibling");},

			// Parent Checks
			parent: function(a){return a.firstChild;},
			empty: function(a){return !a.firstChild;},

			// Text Check
			contains: function(a,i,m){return (a.textContent||a.innerText||jQuery(a).text()||"").indexOf(m[3])>=0;},

			// Visibility
			visible: function(a){return "hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden";},
			hidden: function(a){return "hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden";},

			// Form attributes
			enabled: function(a){return !a.disabled;},
			disabled: function(a){return a.disabled;},
			checked: function(a){return a.checked;},
			selected: function(a){return a.selected||jQuery.attr(a,"selected");},

			// Form elements
			text: function(a){return "text"==a.type;},
			radio: function(a){return "radio"==a.type;},
			checkbox: function(a){return "checkbox"==a.type;},
			file: function(a){return "file"==a.type;},
			password: function(a){return "password"==a.type;},
			submit: function(a){return "submit"==a.type;},
			image: function(a){return "image"==a.type;},
			reset: function(a){return "reset"==a.type;},
			button: function(a){return "button"==a.type||jQuery.nodeName(a,"button");},
			input: function(a){return /input|select|textarea|button/i.test(a.nodeName);},

			// :has()
			has: function(a,i,m){return jQuery.find(m[3],a).length;},

			// :header
			header: function(a){return /h\d/i.test(a.nodeName);},

			// :animated
			animated: function(a){return jQuery.grep(jQuery.timers,function(fn){return a==fn.elem;}).length;}
		}
	},

	// The regular expressions that power the parsing engine
	parse: [
		// Match: [@value='test'], [@foo]
		/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,

		// Match: :contains('foo')
		/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,

		// Match: :even, :last-child, #id, .class
		new RegExp("^([:.#]*)(" + chars + "+)")
	],

	multiFilter: function( expr, elems, not ) {
		var old, cur = [];

		while ( expr && expr != old ) {
			old = expr;
			var f = jQuery.filter( expr, elems, not );
			expr = f.t.replace(/^\s*,\s*/, "" );
			cur = not ? elems = f.r : jQuery.merge( cur, f.r );
		}

		return cur;
	},

	find: function( t, context ) {
		// Quickly handle non-string expressions
		if ( typeof t != "string" )
			return [ t ];

		// check to make sure context is a DOM element or a document
		if ( context && context.nodeType != 1 && context.nodeType != 9)
			return [ ];

		// Set the correct context (if none is provided)
		context = context || document;

		// Initialize the search
		var ret = [context], done = [], last, nodeName;

		// Continue while a selector expression exists, and while
		// we're no longer looping upon ourselves
		while ( t && last != t ) {
			var r = [];
			last = t;

			t = jQuery.trim(t);

			var foundToken = false,

			// An attempt at speeding up child selectors that
			// point to a specific element tag
				re = quickChild,

				m = re.exec(t);

			if ( m ) {
				nodeName = m[1].toUpperCase();

				// Perform our own iteration and filter
				for ( var i = 0; ret[i]; i++ )
					for ( var c = ret[i].firstChild; c; c = c.nextSibling )
						if ( c.nodeType == 1 && (nodeName == "*" || c.nodeName.toUpperCase() == nodeName) )
							r.push( c );

				ret = r;
				t = t.replace( re, "" );
				if ( t.indexOf(" ") == 0 ) continue;
				foundToken = true;
			} else {
				re = /^([>+~])\s*(\w*)/i;

				if ( (m = re.exec(t)) != null ) {
					r = [];

					var merge = {};
					nodeName = m[2].toUpperCase();
					m = m[1];

					for ( var j = 0, rl = ret.length; j < rl; j++ ) {
						var n = m == "~" || m == "+" ? ret[j].nextSibling : ret[j].firstChild;
						for ( ; n; n = n.nextSibling )
							if ( n.nodeType == 1 ) {
								var id = jQuery.data(n);

								if ( m == "~" && merge[id] ) break;

								if (!nodeName || n.nodeName.toUpperCase() == nodeName ) {
									if ( m == "~" ) merge[id] = true;
									r.push( n );
								}

								if ( m == "+" ) break;
							}
					}

					ret = r;

					// And remove the token
					t = jQuery.trim( t.replace( re, "" ) );
					foundToken = true;
				}
			}

			// See if there's still an expression, and that we haven't already
			// matched a token
			if ( t && !foundToken ) {
				// Handle multiple expressions
				if ( !t.indexOf(",") ) {
					// Clean the result set
					if ( context == ret[0] ) ret.shift();

					// Merge the result sets
					done = jQuery.merge( done, ret );

					// Reset the context
					r = ret = [context];

					// Touch up the selector string
					t = " " + t.substr(1,t.length);

				} else {
					// Optimize for the case nodeName#idName
					var re2 = quickID;
					var m = re2.exec(t);

					// Re-organize the results, so that they're consistent
					if ( m ) {
						m = [ 0, m[2], m[3], m[1] ];

					} else {
						// Otherwise, do a traditional filter check for
						// ID, class, and element selectors
						re2 = quickClass;
						m = re2.exec(t);
					}

					m[2] = m[2].replace(/\\/g, "");

					var elem = ret[ret.length-1];

					// Try to do a global search by ID, where we can
					if ( m[1] == "#" && elem && elem.getElementById && !jQuery.isXMLDoc(elem) ) {
						// Optimization for HTML document case
						var oid = elem.getElementById(m[2]);

						// Do a quick check for the existence of the actual ID attribute
						// to avoid selecting by the name attribute in IE
						// also check to insure id is a string to avoid selecting an element with the name of 'id' inside a form
						if ( (jQuery.browser.msie||jQuery.browser.opera) && oid && typeof oid.id == "string" && oid.id != m[2] )
							oid = jQuery('[@id="'+m[2]+'"]', elem)[0];

						// Do a quick check for node name (where applicable) so
						// that div#foo searches will be really fast
						ret = r = oid && (!m[3] || jQuery.nodeName(oid, m[3])) ? [oid] : [];
					} else {
						// We need to find all descendant elements
						for ( var i = 0; ret[i]; i++ ) {
							// Grab the tag name being searched for
							var tag = m[1] == "#" && m[3] ? m[3] : m[1] != "" || m[0] == "" ? "*" : m[2];

							// Handle IE7 being really dumb about <object>s
							if ( tag == "*" && ret[i].nodeName.toLowerCase() == "object" )
								tag = "param";

							r = jQuery.merge( r, ret[i].getElementsByTagName( tag ));
						}

						// It's faster to filter by class and be done with it
						if ( m[1] == "." )
							r = jQuery.classFilter( r, m[2] );

						// Same with ID filtering
						if ( m[1] == "#" ) {
							var tmp = [];

							// Try to find the element with the ID
							for ( var i = 0; r[i]; i++ )
								if ( r[i].getAttribute("id") == m[2] ) {
									tmp = [ r[i] ];
									break;
								}

							r = tmp;
						}

						ret = r;
					}

					t = t.replace( re2, "" );
				}

			}

			// If a selector string still exists
			if ( t ) {
				// Attempt to filter it
				var val = jQuery.filter(t,r);
				ret = r = val.r;
				t = jQuery.trim(val.t);
			}
		}

		// An error occurred with the selector;
		// just return an empty set instead
		if ( t )
			ret = [];

		// Remove the root context
		if ( ret && context == ret[0] )
			ret.shift();

		// And combine the results
		done = jQuery.merge( done, ret );

		return done;
	},

	classFilter: function(r,m,not){
		m = " " + m + " ";
		var tmp = [];
		for ( var i = 0; r[i]; i++ ) {
			var pass = (" " + r[i].className + " ").indexOf( m ) >= 0;
			if ( !not && pass || not && !pass )
				tmp.push( r[i] );
		}
		return tmp;
	},

	filter: function(t,r,not) {
		var last;

		// Look for common filter expressions
		while ( t && t != last ) {
			last = t;

			var p = jQuery.parse, m;

			for ( var i = 0; p[i]; i++ ) {
				m = p[i].exec( t );

				if ( m ) {
					// Remove what we just matched
					t = t.substring( m[0].length );

					m[2] = m[2].replace(/\\/g, "");
					break;
				}
			}

			if ( !m )
				break;

			// :not() is a special case that can be optimized by
			// keeping it out of the expression list
			if ( m[1] == ":" && m[2] == "not" )
				// optimize if only one selector found (most common case)
				r = isSimple.test( m[3] ) ?
					jQuery.filter(m[3], r, true).r :
					jQuery( r ).not( m[3] );

			// We can get a big speed boost by filtering by class here
			else if ( m[1] == "." )
				r = jQuery.classFilter(r, m[2], not);

			else if ( m[1] == "[" ) {
				var tmp = [], type = m[3];

				for ( var i = 0, rl = r.length; i < rl; i++ ) {
					var a = r[i], z = a[ jQuery.props[m[2]] || m[2] ];

					if ( z == null || /href|src|selected/.test(m[2]) )
						z = jQuery.attr(a,m[2]) || '';

					if ( (type == "" && !!z ||
						 type == "=" && z == m[5] ||
						 type == "!=" && z != m[5] ||
						 type == "^=" && z && !z.indexOf(m[5]) ||
						 type == "$=" && z.substr(z.length - m[5].length) == m[5] ||
						 (type == "*=" || type == "~=") && z.indexOf(m[5]) >= 0) ^ not )
							tmp.push( a );
				}

				r = tmp;

			// We can get a speed boost by handling nth-child here
			} else if ( m[1] == ":" && m[2] == "nth-child" ) {
				var merge = {}, tmp = [],
					// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
					test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
						m[3] == "even" && "2n" || m[3] == "odd" && "2n+1" ||
						!/\D/.test(m[3]) && "0n+" + m[3] || m[3]),
					// calculate the numbers (first)n+(last) including if they are negative
					first = (test[1] + (test[2] || 1)) - 0, last = test[3] - 0;

				// loop through all the elements left in the jQuery object
				for ( var i = 0, rl = r.length; i < rl; i++ ) {
					var node = r[i], parentNode = node.parentNode, id = jQuery.data(parentNode);

					if ( !merge[id] ) {
						var c = 1;

						for ( var n = parentNode.firstChild; n; n = n.nextSibling )
							if ( n.nodeType == 1 )
								n.nodeIndex = c++;

						merge[id] = true;
					}

					var add = false;

					if ( first == 0 ) {
						if ( node.nodeIndex == last )
							add = true;
					} else if ( (node.nodeIndex - last) % first == 0 && (node.nodeIndex - last) / first >= 0 )
						add = true;

					if ( add ^ not )
						tmp.push( node );
				}

				r = tmp;

			// Otherwise, find the expression to execute
			} else {
				var fn = jQuery.expr[ m[1] ];
				if ( typeof fn == "object" )
					fn = fn[ m[2] ];

				if ( typeof fn == "string" )
					fn = eval("false||function(a,i){return " + fn + ";}");

				// Execute it against the current filter
				r = jQuery.grep( r, function(elem, i){
					return fn(elem, i, m, r);
				}, not );
			}
		}

		// Return an array of filtered elements (r)
		// and the modified expression string (t)
		return { r: r, t: t };
	},

	dir: function( elem, dir ){
		var matched = [],
			cur = elem[dir];
		while ( cur && cur != document ) {
			if ( cur.nodeType == 1 )
				matched.push( cur );
			cur = cur[dir];
		}
		return matched;
	},

	nth: function(cur,result,dir,elem){
		result = result || 1;
		var num = 0;

		for ( ; cur; cur = cur[dir] )
			if ( cur.nodeType == 1 && ++num == result )
				break;

		return cur;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType == 1 && n != elem )
				r.push( n );
		}

		return r;
	}
});
/*
 * A number of helper functions used for managing events.
 * Many of the ideas behind this code orignated from
 * Dean Edwards' addEvent library.
 */
jQuery.event = {

	// Bind an event to an element
	// Original by Dean Edwards
	add: function(elem, types, handler, data) {
		if ( elem.nodeType == 3 || elem.nodeType == 8 )
			return;

		// For whatever reason, IE has trouble passing the window object
		// around, causing it to be cloned in the process
		if ( jQuery.browser.msie && elem.setInterval )
			elem = window;

		// Make sure that the function being executed has a unique ID
		if ( !handler.guid )
			handler.guid = this.guid++;

		// if data is passed, bind to handler
		if( data != undefined ) {
			// Create temporary function pointer to original handler
			var fn = handler;

			// Create unique handler function, wrapped around original handler
			handler = this.proxy( fn, function() {
				// Pass arguments and context to original handler
				return fn.apply(this, arguments);
			});

			// Store data in unique handler
			handler.data = data;
		}

		// Init the element's event structure
		var events = jQuery.data(elem, "events") || jQuery.data(elem, "events", {}),
			handle = jQuery.data(elem, "handle") || jQuery.data(elem, "handle", function(){
				// Handle the second event of a trigger and when
				// an event is called after a page has unloaded
				if ( typeof jQuery != "undefined" && !jQuery.event.triggered )
					return jQuery.event.handle.apply(arguments.callee.elem, arguments);
			});
		// Add elem as a property of the handle function
		// This is to prevent a memory leak with non-native
		// event in IE.
		handle.elem = elem;

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		jQuery.each(types.split(/\s+/), function(index, type) {
			// Namespaced event handlers
			var parts = type.split(".");
			type = parts[0];
			handler.type = parts[1];

			// Get the current list of functions bound to this event
			var handlers = events[type];

			// Init the event handler queue
			if (!handlers) {
				handlers = events[type] = {};

				// Check for a special event handler
				// Only use addEventListener/attachEvent if the special
				// events handler returns false
				if ( !jQuery.event.special[type] || jQuery.event.special[type].setup.call(elem) === false ) {
					// Bind the global event handler to the element
					if (elem.addEventListener)
						elem.addEventListener(type, handle, false);
					else if (elem.attachEvent)
						elem.attachEvent("on" + type, handle);
				}
			}

			// Add the function to the element's handler list
			handlers[handler.guid] = handler;

			// Keep track of which events have been used, for global triggering
			jQuery.event.global[type] = true;
		});

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	guid: 1,
	global: {},

	// Detach an event or set of events from an element
	remove: function(elem, types, handler) {
		// don't do events on text and comment nodes
		if ( elem.nodeType == 3 || elem.nodeType == 8 )
			return;

		var events = jQuery.data(elem, "events"), ret, index;

		if ( events ) {
			// Unbind all events for the element
			if ( types == undefined || (typeof types == "string" && types.charAt(0) == ".") )
				for ( var type in events )
					this.remove( elem, type + (types || "") );
			else {
				// types is actually an event object here
				if ( types.type ) {
					handler = types.handler;
					types = types.type;
				}

				// Handle multiple events seperated by a space
				// jQuery(...).unbind("mouseover mouseout", fn);
				jQuery.each(types.split(/\s+/), function(index, type){
					// Namespaced event handlers
					var parts = type.split(".");
					type = parts[0];

					if ( events[type] ) {
						// remove the given handler for the given type
						if ( handler )
							delete events[type][handler.guid];

						// remove all handlers for the given type
						else
							for ( handler in events[type] )
								// Handle the removal of namespaced events
								if ( !parts[1] || events[type][handler].type == parts[1] )
									delete events[type][handler];

						// remove generic event handler if no more handlers exist
						for ( ret in events[type] ) break;
						if ( !ret ) {
							if ( !jQuery.event.special[type] || jQuery.event.special[type].teardown.call(elem) === false ) {
								if (elem.removeEventListener)
									elem.removeEventListener(type, jQuery.data(elem, "handle"), false);
								else if (elem.detachEvent)
									elem.detachEvent("on" + type, jQuery.data(elem, "handle"));
							}
							ret = null;
							delete events[type];
						}
					}
				});
			}

			// Remove the expando if it's no longer used
			for ( ret in events ) break;
			if ( !ret ) {
				var handle = jQuery.data( elem, "handle" );
				if ( handle ) handle.elem = null;
				jQuery.removeData( elem, "events" );
				jQuery.removeData( elem, "handle" );
			}
		}
	},

	trigger: function(type, data, elem, donative, extra) {
		// Clone the incoming data, if any
		data = jQuery.makeArray(data);

		if ( type.indexOf("!") >= 0 ) {
			type = type.slice(0, -1);
			var exclusive = true;
		}

		// Handle a global trigger
		if ( !elem ) {
			// Only trigger if we've ever bound an event for it
			if ( this.global[type] )
				jQuery("*").add([window, document]).trigger(type, data);

		// Handle triggering a single element
		} else {
			// don't do events on text and comment nodes
			if ( elem.nodeType == 3 || elem.nodeType == 8 )
				return undefined;

			var val, ret, fn = jQuery.isFunction( elem[ type ] || null ),
				// Check to see if we need to provide a fake event, or not
				event = !data[0] || !data[0].preventDefault;

			// Pass along a fake event
			if ( event ) {
				data.unshift({
					type: type,
					target: elem,
					preventDefault: function(){},
					stopPropagation: function(){},
					timeStamp: now()
				});
				data[0][expando] = true; // no need to fix fake event
			}

			// Enforce the right trigger type
			data[0].type = type;
			if ( exclusive )
				data[0].exclusive = true;

			// Trigger the event, it is assumed that "handle" is a function
			var handle = jQuery.data(elem, "handle");
			if ( handle )
				val = handle.apply( elem, data );

			// Handle triggering native .onfoo handlers (and on links since we don't call .click() for links)
			if ( (!fn || (jQuery.nodeName(elem, 'a') && type == "click")) && elem["on"+type] && elem["on"+type].apply( elem, data ) === false )
				val = false;

			// Extra functions don't get the custom event object
			if ( event )
				data.shift();

			// Handle triggering of extra function
			if ( extra && jQuery.isFunction( extra ) ) {
				// call the extra function and tack the current return value on the end for possible inspection
				ret = extra.apply( elem, val == null ? data : data.concat( val ) );
				// if anything is returned, give it precedence and have it overwrite the previous value
				if (ret !== undefined)
					val = ret;
			}

			// Trigger the native events (except for clicks on links)
			if ( fn && donative !== false && val !== false && !(jQuery.nodeName(elem, 'a') && type == "click") ) {
				this.triggered = true;
				try {
					elem[ type ]();
				// prevent IE from throwing an error for some hidden elements
				} catch (e) {}
			}

			this.triggered = false;
		}

		return val;
	},

	handle: function(event) {
		// returned undefined or false
		var val, ret, namespace, all, handlers;

		event = arguments[0] = jQuery.event.fix( event || window.event );

		// Namespaced event handlers
		namespace = event.type.split(".");
		event.type = namespace[0];
		namespace = namespace[1];
		// Cache this now, all = true means, any handler
		all = !namespace && !event.exclusive;

		handlers = ( jQuery.data(this, "events") || {} )[event.type];

		for ( var j in handlers ) {
			var handler = handlers[j];

			// Filter the functions by class
			if ( all || handler.type == namespace ) {
				// Pass in a reference to the handler function itself
				// So that we can later remove it
				event.handler = handler;
				event.data = handler.data;

				ret = handler.apply( this, arguments );

				if ( val !== false )
					val = ret;

				if ( ret === false ) {
					event.preventDefault();
					event.stopPropagation();
				}
			}
		}

		return val;
	},

	fix: function(event) {
		if ( event[expando] == true )
			return event;

		// store a copy of the original event object
		// and "clone" to set read-only properties
		var originalEvent = event;
		event = { originalEvent: originalEvent };
		var props = "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view wheelDelta which".split(" ");
		for ( var i=props.length; i; i-- )
			event[ props[i] ] = originalEvent[ props[i] ];

		// Mark it as fixed
		event[expando] = true;

		// add preventDefault and stopPropagation since
		// they will not work on the clone
		event.preventDefault = function() {
			// if preventDefault exists run it on the original event
			if (originalEvent.preventDefault)
				originalEvent.preventDefault();
			// otherwise set the returnValue property of the original event to false (IE)
			originalEvent.returnValue = false;
		};
		event.stopPropagation = function() {
			// if stopPropagation exists run it on the original event
			if (originalEvent.stopPropagation)
				originalEvent.stopPropagation();
			// otherwise set the cancelBubble property of the original event to true (IE)
			originalEvent.cancelBubble = true;
		};

		// Fix timeStamp
		event.timeStamp = event.timeStamp || now();

		// Fix target property, if necessary
		if ( !event.target )
			event.target = event.srcElement || document; // Fixes #1925 where srcElement might not be defined either

		// check if target is a textnode (safari)
		if ( event.target.nodeType == 3 )
			event.target = event.target.parentNode;

		// Add relatedTarget, if necessary
		if ( !event.relatedTarget && event.fromElement )
			event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;

		// Calculate pageX/Y if missing and clientX/Y available
		if ( event.pageX == null && event.clientX != null ) {
			var doc = document.documentElement, body = document.body;
			event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
			event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
		}

		// Add which for key events
		if ( !event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode) )
			event.which = event.charCode || event.keyCode;

		// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
		if ( !event.metaKey && event.ctrlKey )
			event.metaKey = event.ctrlKey;

		// Add which for click: 1 == left; 2 == middle; 3 == right
		// Note: button is not normalized, so don't use it
		if ( !event.which && event.button )
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));

		return event;
	},

	proxy: function( fn, proxy ){
		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || proxy.guid || this.guid++;
		// So proxy can be declared as an argument
		return proxy;
	},

	special: {
		ready: {
			setup: function() {
				// Make sure the ready event is setup
				bindReady();
				return;
			},

			teardown: function() { return; }
		},

		mouseenter: {
			setup: function() {
				if ( jQuery.browser.msie ) return false;
				jQuery(this).bind("mouseover", jQuery.event.special.mouseenter.handler);
				return true;
			},

			teardown: function() {
				if ( jQuery.browser.msie ) return false;
				jQuery(this).unbind("mouseover", jQuery.event.special.mouseenter.handler);
				return true;
			},

			handler: function(event) {
				// If we actually just moused on to a sub-element, ignore it
				if ( withinElement(event, this) ) return true;
				// Execute the right handlers by setting the event type to mouseenter
				event.type = "mouseenter";
				return jQuery.event.handle.apply(this, arguments);
			}
		},

		mouseleave: {
			setup: function() {
				if ( jQuery.browser.msie ) return false;
				jQuery(this).bind("mouseout", jQuery.event.special.mouseleave.handler);
				return true;
			},

			teardown: function() {
				if ( jQuery.browser.msie ) return false;
				jQuery(this).unbind("mouseout", jQuery.event.special.mouseleave.handler);
				return true;
			},

			handler: function(event) {
				// If we actually just moused on to a sub-element, ignore it
				if ( withinElement(event, this) ) return true;
				// Execute the right handlers by setting the event type to mouseleave
				event.type = "mouseleave";
				return jQuery.event.handle.apply(this, arguments);
			}
		}
	}
};

jQuery.fn.extend({
	bind: function( type, data, fn ) {
		return type == "unload" ? this.one(type, data, fn) : this.each(function(){
			jQuery.event.add( this, type, fn || data, fn && data );
		});
	},

	one: function( type, data, fn ) {
		var one = jQuery.event.proxy( fn || data, function(event) {
			jQuery(this).unbind(event, one);
			return (fn || data).apply( this, arguments );
		});
		return this.each(function(){
			jQuery.event.add( this, type, one, fn && data);
		});
	},

	unbind: function( type, fn ) {
		return this.each(function(){
			jQuery.event.remove( this, type, fn );
		});
	},

	trigger: function( type, data, fn ) {
		return this.each(function(){
			jQuery.event.trigger( type, data, this, true, fn );
		});
	},

	triggerHandler: function( type, data, fn ) {
		return this[0] && jQuery.event.trigger( type, data, this[0], false, fn );
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments, i = 1;

		// link all the functions, so any of them can unbind this click handler
		while( i < args.length )
			jQuery.event.proxy( fn, args[i++] );

		return this.click( jQuery.event.proxy( fn, function(event) {
			// Figure out which function to execute
			this.lastToggle = ( this.lastToggle || 0 ) % i;

			// Make sure that clicks stop
			event.preventDefault();

			// and execute the function
			return args[ this.lastToggle++ ].apply( this, arguments ) || false;
		}));
	},

	hover: function(fnOver, fnOut) {
		return this.bind('mouseenter', fnOver).bind('mouseleave', fnOut);
	},

	ready: function(fn) {
		// Attach the listeners
		bindReady();

		// If the DOM is already ready
		if ( jQuery.isReady )
			// Execute the function immediately
			fn.call( document, jQuery );

		// Otherwise, remember the function for later
		else
			// Add the function to the wait list
			jQuery.readyList.push( function() { return fn.call(this, jQuery); } );

		return this;
	}
});

jQuery.extend({
	isReady: false,
	readyList: [],
	// Handle when the DOM is ready
	ready: function() {
		// Make sure that the DOM is not already loaded
		if ( !jQuery.isReady ) {
			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If there are functions bound, to execute
			if ( jQuery.readyList ) {
				// Execute all of them
				jQuery.each( jQuery.readyList, function(){
					this.call( document );
				});

				// Reset the list of functions
				jQuery.readyList = null;
			}

			// Trigger any bound ready events
			jQuery(document).triggerHandler("ready");
		}
	}
});

var readyBound = false;

function bindReady(){
	if ( readyBound ) return;
	readyBound = true;

	// Mozilla, Opera (see further below for it) and webkit nightlies currently support this event
	if ( document.addEventListener && !jQuery.browser.opera)
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", jQuery.ready, false );

	// If IE is used and is not in a frame
	// Continually check to see if the document is ready
	if ( jQuery.browser.msie && window == top ) (function(){
		if (jQuery.isReady) return;
		try {
			// If IE is used, use the trick by Diego Perini
			// http://javascript.nwbox.com/IEContentLoaded/
			document.documentElement.doScroll("left");
		} catch( error ) {
			setTimeout( arguments.callee, 0 );
			return;
		}
		// and execute any waiting functions
		jQuery.ready();
	})();

	if ( jQuery.browser.opera )
		document.addEventListener( "DOMContentLoaded", function () {
			if (jQuery.isReady) return;
			for (var i = 0; i < document.styleSheets.length; i++)
				if (document.styleSheets[i].disabled) {
					setTimeout( arguments.callee, 0 );
					return;
				}
			// and execute any waiting functions
			jQuery.ready();
		}, false);

	if ( jQuery.browser.safari ) {
		var numStyles;
		(function(){
			if (jQuery.isReady) return;
			if ( document.readyState != "loaded" && document.readyState != "complete" ) {
				setTimeout( arguments.callee, 0 );
				return;
			}
			if ( numStyles === undefined )
				numStyles = jQuery("style, link[rel=stylesheet]").length;
			if ( document.styleSheets.length != numStyles ) {
				setTimeout( arguments.callee, 0 );
				return;
			}
			// and execute any waiting functions
			jQuery.ready();
		})();
	}

	// A fallback to window.onload, that will always work
	jQuery.event.add( window, "load", jQuery.ready );
}

jQuery.each( ("blur,focus,load,resize,scroll,unload,click,dblclick," +
	"mousedown,mouseup,mousemove,mouseover,mouseout,change,select," +
	"submit,keydown,keypress,keyup,error").split(","), function(i, name){

	// Handle event binding
	jQuery.fn[name] = function(fn){
		return fn ? this.bind(name, fn) : this.trigger(name);
	};
});

// Checks if an event happened on an element within another element
// Used in jQuery.event.special.mouseenter and mouseleave handlers
var withinElement = function(event, elem) {
	// Check if mouse(over|out) are still within the same parent element
	var parent = event.relatedTarget;
	// Traverse up the tree
	while ( parent && parent != elem ) try { parent = parent.parentNode; } catch(error) { parent = elem; }
	// Return true if we actually just moused on to a sub-element
	return parent == elem;
};

// Prevent memory leaks in IE
// And prevent errors on refresh with events like mouseover in other browsers
// Window isn't included so as not to unbind existing unload events
jQuery(window).bind("unload", function() {
	jQuery("*").add(document).unbind();
});
jQuery.fn.extend({
	// Keep a copy of the old load
	_load: jQuery.fn.load,

	load: function( url, params, callback ) {
		if ( typeof url != 'string' )
			return this._load( url );

		var off = url.indexOf(" ");
		if ( off >= 0 ) {
			var selector = url.slice(off, url.length);
			url = url.slice(0, off);
		}

		callback = callback || function(){};

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params )
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = null;

			// Otherwise, build a param string
			} else {
				params = jQuery.param( params );
				type = "POST";
			}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			complete: function(res, status){
				// If successful, inject the HTML into all the matched elements
				if ( status == "success" || status == "notmodified" )
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div/>")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(res.responseText.replace(/<script(.|\s)*?\/script>/g, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						res.responseText );

				self.each( callback, [res.responseText, status, res] );
			}
		});
		return this;
	},

	serialize: function() {
		return jQuery.param(this.serializeArray());
	},
	serializeArray: function() {
		return this.map(function(){
			return jQuery.nodeName(this, "form") ?
				jQuery.makeArray(this.elements) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				(this.checked || /select|textarea/i.test(this.nodeName) ||
					/text|hidden|password/i.test(this.type));
		})
		.map(function(i, elem){
			var val = jQuery(this).val();
			return val == null ? null :
				val.constructor == Array ?
					jQuery.map( val, function(val, i){
						return {name: elem.name, value: val};
					}) :
					{name: elem.name, value: val};
		}).get();
	}
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","), function(i,o){
	jQuery.fn[o] = function(f){
		return this.bind(o, f);
	};
});

var jsc = now();

jQuery.extend({
	get: function( url, data, callback, type ) {
		// shift arguments if data argument was ommited
		if ( jQuery.isFunction( data ) ) {
			callback = data;
			data = null;
		}

		return jQuery.ajax({
			type: "GET",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	getScript: function( url, callback ) {
		return jQuery.get(url, null, callback, "script");
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get(url, data, callback, "json");
	},

	post: function( url, data, callback, type ) {
		if ( jQuery.isFunction( data ) ) {
			callback = data;
			data = {};
		}

		return jQuery.ajax({
			type: "POST",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	ajaxSetup: function( settings ) {
		jQuery.extend( jQuery.ajaxSettings, settings );
	},

	ajaxSettings: {
		url: location.href,
		global: true,
		type: "GET",
		timeout: 0,
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		data: null,
		username: null,
		password: null,
		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			script: "text/javascript, application/javascript",
			json: "application/json, text/javascript",
			text: "text/plain",
			_default: "*/*"
		}
	},

	// Last-Modified header cache for next request
	lastModified: {},

	ajax: function( s ) {
		// Extend the settings, but re-extend 's' so that it can be
		// checked again later (in the test suite, specifically)
		s = jQuery.extend(true, s, jQuery.extend(true, {}, jQuery.ajaxSettings, s));

		var jsonp, jsre = /=\?(&|$)/g, status, data,
			type = s.type.toUpperCase();

		// convert data if not already a string
		if ( s.data && s.processData && typeof s.data != "string" )
			s.data = jQuery.param(s.data);

		// Handle JSONP Parameter Callbacks
		if ( s.dataType == "jsonp" ) {
			if ( type == "GET" ) {
				if ( !s.url.match(jsre) )
					s.url += (s.url.match(/\?/) ? "&" : "?") + (s.jsonp || "callback") + "=?";
			} else if ( !s.data || !s.data.match(jsre) )
				s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
			s.dataType = "json";
		}

		// Build temporary JSONP function
		if ( s.dataType == "json" && (s.data && s.data.match(jsre) || s.url.match(jsre)) ) {
			jsonp = "jsonp" + jsc++;

			// Replace the =? sequence both in the query string and the data
			if ( s.data )
				s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
			s.url = s.url.replace(jsre, "=" + jsonp + "$1");

			// We need to make sure
			// that a JSONP style response is executed properly
			s.dataType = "script";

			// Handle JSONP-style loading
			window[ jsonp ] = function(tmp){
				data = tmp;
				success();
				complete();
				// Garbage collect
				window[ jsonp ] = undefined;
				try{ delete window[ jsonp ]; } catch(e){}
				if ( head )
					head.removeChild( script );
			};
		}

		if ( s.dataType == "script" && s.cache == null )
			s.cache = false;

		if ( s.cache === false && type == "GET" ) {
			var ts = now();
			// try replacing _= if it is there
			var ret = s.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + ts + "$2");
			// if nothing was replaced, add timestamp to the end
			s.url = ret + ((ret == s.url) ? (s.url.match(/\?/) ? "&" : "?") + "_=" + ts : "");
		}

		// If data is available, append data to url for get requests
		if ( s.data && type == "GET" ) {
			s.url += (s.url.match(/\?/) ? "&" : "?") + s.data;

			// IE likes to send both get and post data, prevent this
			s.data = null;
		}

		// Watch for a new set of requests
		if ( s.global && ! jQuery.active++ )
			jQuery.event.trigger( "ajaxStart" );

		// Matches an absolute URL, and saves the domain
		var remote = /^(?:\w+:)?\/\/([^\/?#]+)/;

		// If we're requesting a remote document
		// and trying to load JSON or Script with a GET
		if ( s.dataType == "script" && type == "GET"
				&& remote.test(s.url) && remote.exec(s.url)[1] != location.host ){
			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement("script");
			script.src = s.url;
			if (s.scriptCharset)
				script.charset = s.scriptCharset;

			// Handle Script loading
			if ( !jsonp ) {
				var done = false;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function(){
					if ( !done && (!this.readyState ||
							this.readyState == "loaded" || this.readyState == "complete") ) {
						done = true;
						success();
						complete();
						head.removeChild( script );
					}
				};
			}

			head.appendChild(script);

			// We handle everything using the script element injection
			return undefined;
		}

		var requestDone = false;

		// Create the request object; Microsoft failed to properly
		// implement the XMLHttpRequest in IE7, so we use the ActiveXObject when it is available
		var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();

		// Open the socket
		// Passing null username, generates a login popup on Opera (#2865)
		if( s.username )
			xhr.open(type, s.url, s.async, s.username, s.password);
		else
			xhr.open(type, s.url, s.async);

		// Need an extra try/catch for cross domain requests in Firefox 3
		try {
			// Set the correct header, if data is being sent
			if ( s.data )
				xhr.setRequestHeader("Content-Type", s.contentType);

			// Set the If-Modified-Since header, if ifModified mode.
			if ( s.ifModified )
				xhr.setRequestHeader("If-Modified-Since",
					jQuery.lastModified[s.url] || "Thu, 01 Jan 1970 00:00:00 GMT" );

			// Set header so the called script knows that it's an XMLHttpRequest
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

			// Set the Accepts header for the server, depending on the dataType
			xhr.setRequestHeader("Accept", s.dataType && s.accepts[ s.dataType ] ?
				s.accepts[ s.dataType ] + ", */*" :
				s.accepts._default );
		} catch(e){}

		// Allow custom headers/mimetypes
		if ( s.beforeSend && s.beforeSend(xhr, s) === false ) {
			// cleanup active request counter
			s.global && jQuery.active--;
			// close opended socket
			xhr.abort();
			return false;
		}

		if ( s.global )
			jQuery.event.trigger("ajaxSend", [xhr, s]);

		// Wait for a response to come back
		var onreadystatechange = function(isTimeout){
			// The transfer is complete and the data is available, or the request timed out
			if ( !requestDone && xhr && (xhr.readyState == 4 || isTimeout == "timeout") ) {
				requestDone = true;

				// clear poll interval
				if (ival) {
					clearInterval(ival);
					ival = null;
				}

				status = isTimeout == "timeout" && "timeout" ||
					!jQuery.httpSuccess( xhr ) && "error" ||
					s.ifModified && jQuery.httpNotModified( xhr, s.url ) && "notmodified" ||
					"success";

				if ( status == "success" ) {
					// Watch for, and catch, XML document parse errors
					try {
						// process the data (runs the xml through httpData regardless of callback)
						data = jQuery.httpData( xhr, s.dataType, s.dataFilter );
					} catch(e) {
						status = "parsererror";
					}
				}

				// Make sure that the request was successful or notmodified
				if ( status == "success" ) {
					// Cache Last-Modified header, if ifModified mode.
					var modRes;
					try {
						modRes = xhr.getResponseHeader("Last-Modified");
					} catch(e) {} // swallow exception thrown by FF if header is not available

					if ( s.ifModified && modRes )
						jQuery.lastModified[s.url] = modRes;

					// JSONP handles its own success callback
					if ( !jsonp )
						success();
				} else
					jQuery.handleError(s, xhr, status);

				// Fire the complete handlers
				complete();

				// Stop memory leaks
				if ( s.async )
					xhr = null;
			}
		};

		if ( s.async ) {
			// don't attach the handler to the request, just poll it instead
			var ival = setInterval(onreadystatechange, 13);

			// Timeout checker
			if ( s.timeout > 0 )
				setTimeout(function(){
					// Check to see if the request is still happening
					if ( xhr ) {
						// Cancel the request
						xhr.abort();

						if( !requestDone )
							onreadystatechange( "timeout" );
					}
				}, s.timeout);
		}

		// Send the data
		try {
			xhr.send(s.data);
		} catch(e) {
			jQuery.handleError(s, xhr, null, e);
		}

		// firefox 1.5 doesn't fire statechange for sync requests
		if ( !s.async )
			onreadystatechange();

		function success(){
			// If a local callback was specified, fire it and pass it the data
			if ( s.success )
				s.success( data, status );

			// Fire the global callback
			if ( s.global )
				jQuery.event.trigger( "ajaxSuccess", [xhr, s] );
		}

		function complete(){
			// Process result
			if ( s.complete )
				s.complete(xhr, status);

			// The request was completed
			if ( s.global )
				jQuery.event.trigger( "ajaxComplete", [xhr, s] );

			// Handle the global AJAX counter
			if ( s.global && ! --jQuery.active )
				jQuery.event.trigger( "ajaxStop" );
		}

		// return XMLHttpRequest to allow aborting the request etc.
		return xhr;
	},

	handleError: function( s, xhr, status, e ) {
		// If a local callback was specified, fire it
		if ( s.error ) s.error( xhr, status, e );

		// Fire the global callback
		if ( s.global )
			jQuery.event.trigger( "ajaxError", [xhr, s, e] );
	},

	// Counter for holding the number of active queries
	active: 0,

	// Determines if an XMLHttpRequest was successful or not
	httpSuccess: function( xhr ) {
		try {
			// IE error sometimes returns 1223 when it should be 204 so treat it as success, see #1450
			return !xhr.status && location.protocol == "file:" ||
				( xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304 || xhr.status == 1223 ||
				jQuery.browser.safari && xhr.status == undefined;
		} catch(e){}
		return false;
	},

	// Determines if an XMLHttpRequest returns NotModified
	httpNotModified: function( xhr, url ) {
		try {
			var xhrRes = xhr.getResponseHeader("Last-Modified");

			// Firefox always returns 200. check Last-Modified date
			return xhr.status == 304 || xhrRes == jQuery.lastModified[url] ||
				jQuery.browser.safari && xhr.status == undefined;
		} catch(e){}
		return false;
	},

	httpData: function( xhr, type, filter ) {
		var ct = xhr.getResponseHeader("content-type"),
			xml = type == "xml" || !type && ct && ct.indexOf("xml") >= 0,
			data = xml ? xhr.responseXML : xhr.responseText;

		if ( xml && data.documentElement.tagName == "parsererror" )
			throw "parsererror";
			
		// Allow a pre-filtering function to sanitize the response
		if( filter )
			data = filter( data, type );

		// If the type is "script", eval it in global context
		if ( type == "script" )
			jQuery.globalEval( data );

		// Get the JavaScript object, if JSON is used.
		if ( type == "json" )
			data = eval("(" + data + ")");

		return data;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a ) {
		var s = [];

		// If an array was passed in, assume that it is an array
		// of form elements
		if ( a.constructor == Array || a.jquery )
			// Serialize the form elements
			jQuery.each( a, function(){
				s.push( encodeURIComponent(this.name) + "=" + encodeURIComponent( this.value ) );
			});

		// Otherwise, assume that it's an object of key/value pairs
		else
			// Serialize the key/values
			for ( var j in a )
				// If the value is an array then the key names need to be repeated
				if ( a[j] && a[j].constructor == Array )
					jQuery.each( a[j], function(){
						s.push( encodeURIComponent(j) + "=" + encodeURIComponent( this ) );
					});
				else
					s.push( encodeURIComponent(j) + "=" + encodeURIComponent( jQuery.isFunction(a[j]) ? a[j]() : a[j] ) );

		// Return the resulting serialization
		return s.join("&").replace(/%20/g, "+");
	}

});
jQuery.fn.extend({
	show: function(speed,callback){
		return speed ?
			this.animate({
				height: "show", width: "show", opacity: "show"
			}, speed, callback) :

			this.filter(":hidden").each(function(){
				this.style.display = this.oldblock || "";
				if ( jQuery.css(this,"display") == "none" ) {
					var elem = jQuery("<" + this.tagName + " />").appendTo("body");
					this.style.display = elem.css("display");
					// handle an edge condition where css is - div { display:none; } or similar
					if (this.style.display == "none")
						this.style.display = "block";
					elem.remove();
				}
			}).end();
	},

	hide: function(speed,callback){
		return speed ?
			this.animate({
				height: "hide", width: "hide", opacity: "hide"
			}, speed, callback) :

			this.filter(":visible").each(function(){
				this.oldblock = this.oldblock || jQuery.css(this,"display");
				this.style.display = "none";
			}).end();
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2 ){
		return jQuery.isFunction(fn) && jQuery.isFunction(fn2) ?
			this._toggle.apply( this, arguments ) :
			fn ?
				this.animate({
					height: "toggle", width: "toggle", opacity: "toggle"
				}, fn, fn2) :
				this.each(function(){
					jQuery(this)[ jQuery(this).is(":hidden") ? "show" : "hide" ]();
				});
	},

	slideDown: function(speed,callback){
		return this.animate({height: "show"}, speed, callback);
	},

	slideUp: function(speed,callback){
		return this.animate({height: "hide"}, speed, callback);
	},

	slideToggle: function(speed, callback){
		return this.animate({height: "toggle"}, speed, callback);
	},

	fadeIn: function(speed, callback){
		return this.animate({opacity: "show"}, speed, callback);
	},

	fadeOut: function(speed, callback){
		return this.animate({opacity: "hide"}, speed, callback);
	},

	fadeTo: function(speed,to,callback){
		return this.animate({opacity: to}, speed, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed(speed, easing, callback);

		return this[ optall.queue === false ? "each" : "queue" ](function(){
			if ( this.nodeType != 1)
				return false;

			var opt = jQuery.extend({}, optall), p,
				hidden = jQuery(this).is(":hidden"), self = this;

			for ( p in prop ) {
				if ( prop[p] == "hide" && hidden || prop[p] == "show" && !hidden )
					return opt.complete.call(this);

				if ( p == "height" || p == "width" ) {
					// Store display property
					opt.display = jQuery.css(this, "display");

					// Make sure that nothing sneaks out
					opt.overflow = this.style.overflow;
				}
			}

			if ( opt.overflow != null )
				this.style.overflow = "hidden";

			opt.curAnim = jQuery.extend({}, prop);

			jQuery.each( prop, function(name, val){
				var e = new jQuery.fx( self, opt, name );

				if ( /toggle|show|hide/.test(val) )
					e[ val == "toggle" ? hidden ? "show" : "hide" : val ]( prop );
				else {
					var parts = val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
						start = e.cur(true) || 0;

					if ( parts ) {
						var end = parseFloat(parts[2]),
							unit = parts[3] || "px";

						// We need to compute starting value
						if ( unit != "px" ) {
							self.style[ name ] = (end || 1) + unit;
							start = ((end || 1) / e.cur(true)) * start;
							self.style[ name ] = start + unit;
						}

						// If a +=/-= token was provided, we're doing a relative animation
						if ( parts[1] )
							end = ((parts[1] == "-=" ? -1 : 1) * end) + start;

						e.custom( start, end, unit );
					} else
						e.custom( start, val, "" );
				}
			});

			// For JS strict compliance
			return true;
		});
	},

	queue: function(type, fn){
		if ( jQuery.isFunction(type) || ( type && type.constructor == Array )) {
			fn = type;
			type = "fx";
		}

		if ( !type || (typeof type == "string" && !fn) )
			return queue( this[0], type );

		return this.each(function(){
			if ( fn.constructor == Array )
				queue(this, type, fn);
			else {
				queue(this, type).push( fn );

				if ( queue(this, type).length == 1 )
					fn.call(this);
			}
		});
	},

	stop: function(clearQueue, gotoEnd){
		var timers = jQuery.timers;

		if (clearQueue)
			this.queue([]);

		this.each(function(){
			// go in reverse order so anything added to the queue during the loop is ignored
			for ( var i = timers.length - 1; i >= 0; i-- )
				if ( timers[i].elem == this ) {
					if (gotoEnd)
						// force the next step to be the last
						timers[i](true);
					timers.splice(i, 1);
				}
		});

		// start the next in the queue if the last step wasn't forced
		if (!gotoEnd)
			this.dequeue();

		return this;
	}

});

var queue = function( elem, type, array ) {
	if ( elem ){

		type = type || "fx";

		var q = jQuery.data( elem, type + "queue" );

		if ( !q || array )
			q = jQuery.data( elem, type + "queue", jQuery.makeArray(array) );

	}
	return q;
};

jQuery.fn.dequeue = function(type){
	type = type || "fx";

	return this.each(function(){
		var q = queue(this, type);

		q.shift();

		if ( q.length )
			q[0].call( this );
	});
};

jQuery.extend({

	speed: function(speed, easing, fn) {
		var opt = speed && speed.constructor == Object ? speed : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && easing.constructor != Function && easing
		};

		opt.duration = (opt.duration && opt.duration.constructor == Number ?
			opt.duration :
			jQuery.fx.speeds[opt.duration]) || jQuery.fx.speeds.def;

		// Queueing
		opt.old = opt.complete;
		opt.complete = function(){
			if ( opt.queue !== false )
				jQuery(this).dequeue();
			if ( jQuery.isFunction( opt.old ) )
				opt.old.call( this );
		};

		return opt;
	},

	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;
		}
	},

	timers: [],
	timerId: null,

	fx: function( elem, options, prop ){
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		if ( !options.orig )
			options.orig = {};
	}

});

jQuery.fx.prototype = {

	// Simple function for setting a style value
	update: function(){
		if ( this.options.step )
			this.options.step.call( this.elem, this.now, this );

		(jQuery.fx.step[this.prop] || jQuery.fx.step._default)( this );

		// Set display property to block for height/width animations
		if ( this.prop == "height" || this.prop == "width" )
			this.elem.style.display = "block";
	},

	// Get the current size
	cur: function(force){
		if ( this.elem[this.prop] != null && this.elem.style[this.prop] == null )
			return this.elem[ this.prop ];

		var r = parseFloat(jQuery.css(this.elem, this.prop, force));
		return r && r > -10000 ? r : parseFloat(jQuery.curCSS(this.elem, this.prop)) || 0;
	},

	// Start an animation from one number to another
	custom: function(from, to, unit){
		this.startTime = now();
		this.start = from;
		this.end = to;
		this.unit = unit || this.unit || "px";
		this.now = this.start;
		this.pos = this.state = 0;
		this.update();

		var self = this;
		function t(gotoEnd){
			return self.step(gotoEnd);
		}

		t.elem = this.elem;

		jQuery.timers.push(t);

		if ( jQuery.timerId == null ) {
			jQuery.timerId = setInterval(function(){
				var timers = jQuery.timers;

				for ( var i = 0; i < timers.length; i++ )
					if ( !timers[i]() )
						timers.splice(i--, 1);

				if ( !timers.length ) {
					clearInterval( jQuery.timerId );
					jQuery.timerId = null;
				}
			}, 13);
		}
	},

	// Simple 'show' function
	show: function(){
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.attr( this.elem.style, this.prop );
		this.options.show = true;

		// Begin the animation
		this.custom(0, this.cur());

		// Make sure that we start at a small width/height to avoid any
		// flash of content
		if ( this.prop == "width" || this.prop == "height" )
			this.elem.style[this.prop] = "1px";

		// Start by showing the element
		jQuery(this.elem).show();
	},

	// Simple 'hide' function
	hide: function(){
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.attr( this.elem.style, this.prop );
		this.options.hide = true;

		// Begin the animation
		this.custom(this.cur(), 0);
	},

	// Each step of an animation
	step: function(gotoEnd){
		var t = now();

		if ( gotoEnd || t > this.options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			this.options.curAnim[ this.prop ] = true;

			var done = true;
			for ( var i in this.options.curAnim )
				if ( this.options.curAnim[i] !== true )
					done = false;

			if ( done ) {
				if ( this.options.display != null ) {
					// Reset the overflow
					this.elem.style.overflow = this.options.overflow;

					// Reset the display
					this.elem.style.display = this.options.display;
					if ( jQuery.css(this.elem, "display") == "none" )
						this.elem.style.display = "block";
				}

				// Hide the element if the "hide" operation was done
				if ( this.options.hide )
					this.elem.style.display = "none";

				// Reset the properties, if the item has been hidden or shown
				if ( this.options.hide || this.options.show )
					for ( var p in this.options.curAnim )
						jQuery.attr(this.elem.style, p, this.options.orig[p]);
			}

			if ( done )
				// Execute the complete function
				this.options.complete.call( this.elem );

			return false;
		} else {
			var n = t - this.startTime;
			this.state = n / this.options.duration;

			// Perform the easing function, defaults to swing
			this.pos = jQuery.easing[this.options.easing || (jQuery.easing.swing ? "swing" : "linear")](this.state, n, 0, 1, this.options.duration);
			this.now = this.start + ((this.end - this.start) * this.pos);

			// Perform the next step of the animation
			this.update();
		}

		return true;
	}

};

jQuery.extend( jQuery.fx, {
	speeds:{
		slow: 600,
 		fast: 200,
 		// Default speed
 		def: 400
	},
	step: {
		scrollLeft: function(fx){
			fx.elem.scrollLeft = fx.now;
		},

		scrollTop: function(fx){
			fx.elem.scrollTop = fx.now;
		},

		opacity: function(fx){
			jQuery.attr(fx.elem.style, "opacity", fx.now);
		},

		_default: function(fx){
			fx.elem.style[ fx.prop ] = fx.now + fx.unit;
		}
	}
});
// The Offset Method
// Originally By Brandon Aaron, part of the Dimension Plugin
// http://jquery.com/plugins/project/dimensions
jQuery.fn.offset = function() {
	var left = 0, top = 0, elem = this[0], results;

	if ( elem ) with ( jQuery.browser ) {
		var parent       = elem.parentNode,
		    offsetChild  = elem,
		    offsetParent = elem.offsetParent,
		    doc          = elem.ownerDocument,
		    safari2      = safari && parseInt(version) < 522 && !/adobeair/i.test(userAgent),
		    css          = jQuery.curCSS,
		    fixed        = css(elem, "position") == "fixed";

		// Use getBoundingClientRect if available
		if ( elem.getBoundingClientRect ) {
			var box = elem.getBoundingClientRect();

			// Add the document scroll offsets
			add(box.left + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft),
				box.top  + Math.max(doc.documentElement.scrollTop,  doc.body.scrollTop));

			// IE adds the HTML element's border, by default it is medium which is 2px
			// IE 6 and 7 quirks mode the border width is overwritable by the following css html { border: 0; }
			// IE 7 standards mode, the border is always 2px
			// This border/offset is typically represented by the clientLeft and clientTop properties
			// However, in IE6 and 7 quirks mode the clientLeft and clientTop properties are not updated when overwriting it via CSS
			// Therefore this method will be off by 2px in IE while in quirksmode
			add( -doc.documentElement.clientLeft, -doc.documentElement.clientTop );

		// Otherwise loop through the offsetParents and parentNodes
		} else {

			// Initial element offsets
			add( elem.offsetLeft, elem.offsetTop );

			// Get parent offsets
			while ( offsetParent ) {
				// Add offsetParent offsets
				add( offsetParent.offsetLeft, offsetParent.offsetTop );

				// Mozilla and Safari > 2 does not include the border on offset parents
				// However Mozilla adds the border for table or table cells
				if ( mozilla && !/^t(able|d|h)$/i.test(offsetParent.tagName) || safari && !safari2 )
					border( offsetParent );

				// Add the document scroll offsets if position is fixed on any offsetParent
				if ( !fixed && css(offsetParent, "position") == "fixed" )
					fixed = true;

				// Set offsetChild to previous offsetParent unless it is the body element
				offsetChild  = /^body$/i.test(offsetParent.tagName) ? offsetChild : offsetParent;
				// Get next offsetParent
				offsetParent = offsetParent.offsetParent;
			}

			// Get parent scroll offsets
			while ( parent && parent.tagName && !/^body|html$/i.test(parent.tagName) ) {
				// Remove parent scroll UNLESS that parent is inline or a table to work around Opera inline/table scrollLeft/Top bug
				if ( !/^inline|table.*$/i.test(css(parent, "display")) )
					// Subtract parent scroll offsets
					add( -parent.scrollLeft, -parent.scrollTop );

				// Mozilla does not add the border for a parent that has overflow != visible
				if ( mozilla && css(parent, "overflow") != "visible" )
					border( parent );

				// Get next parent
				parent = parent.parentNode;
			}

			// Safari <= 2 doubles body offsets with a fixed position element/offsetParent or absolutely positioned offsetChild
			// Mozilla doubles body offsets with a non-absolutely positioned offsetChild
			if ( (safari2 && (fixed || css(offsetChild, "position") == "absolute")) ||
				(mozilla && css(offsetChild, "position") != "absolute") )
					add( -doc.body.offsetLeft, -doc.body.offsetTop );

			// Add the document scroll offsets if position is fixed
			if ( fixed )
				add(Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft),
					Math.max(doc.documentElement.scrollTop,  doc.body.scrollTop));
		}

		// Return an object with top and left properties
		results = { top: top, left: left };
	}

	function border(elem) {
		add( jQuery.curCSS(elem, "borderLeftWidth", true), jQuery.curCSS(elem, "borderTopWidth", true) );
	}

	function add(l, t) {
		left += parseInt(l, 10) || 0;
		top += parseInt(t, 10) || 0;
	}

	return results;
};


jQuery.fn.extend({
	position: function() {
		var left = 0, top = 0, results;

		if ( this[0] ) {
			// Get *real* offsetParent
			var offsetParent = this.offsetParent(),

			// Get correct offsets
			offset       = this.offset(),
			parentOffset = /^body|html$/i.test(offsetParent[0].tagName) ? { top: 0, left: 0 } : offsetParent.offset();

			// Subtract element margins
			// note: when an element has margin: auto the offsetLeft and marginLeft 
			// are the same in Safari causing offset.left to incorrectly be 0
			offset.top  -= num( this, 'marginTop' );
			offset.left -= num( this, 'marginLeft' );

			// Add offsetParent borders
			parentOffset.top  += num( offsetParent, 'borderTopWidth' );
			parentOffset.left += num( offsetParent, 'borderLeftWidth' );

			// Subtract the two offsets
			results = {
				top:  offset.top  - parentOffset.top,
				left: offset.left - parentOffset.left
			};
		}

		return results;
	},

	offsetParent: function() {
		var offsetParent = this[0].offsetParent;
		while ( offsetParent && (!/^body|html$/i.test(offsetParent.tagName) && jQuery.css(offsetParent, 'position') == 'static') )
			offsetParent = offsetParent.offsetParent;
		return jQuery(offsetParent);
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( ['Left', 'Top'], function(i, name) {
	var method = 'scroll' + name;
	
	jQuery.fn[ method ] = function(val) {
		if (!this[0]) return;

		return val != undefined ?

			// Set the scroll offset
			this.each(function() {
				this == window || this == document ?
					window.scrollTo(
						!i ? val : jQuery(window).scrollLeft(),
						 i ? val : jQuery(window).scrollTop()
					) :
					this[ method ] = val;
			}) :

			// Return the scroll offset
			this[0] == window || this[0] == document ?
				self[ i ? 'pageYOffset' : 'pageXOffset' ] ||
					jQuery.boxModel && document.documentElement[ method ] ||
					document.body[ method ] :
				this[0][ method ];
	};
});
// Create innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each([ "Height", "Width" ], function(i, name){

	var tl = i ? "Left"  : "Top",  // top or left
		br = i ? "Right" : "Bottom"; // bottom or right

	// innerHeight and innerWidth
	jQuery.fn["inner" + name] = function(){
		return this[ name.toLowerCase() ]() +
			num(this, "padding" + tl) +
			num(this, "padding" + br);
	};

	// outerHeight and outerWidth
	jQuery.fn["outer" + name] = function(margin) {
		return this["inner" + name]() +
			num(this, "border" + tl + "Width") +
			num(this, "border" + br + "Width") +
			(margin ?
				num(this, "margin" + tl) + num(this, "margin" + br) : 0);
	};

});})();
/*!
 * jQuery UI 1.5.2
 *
 * Copyright (c) 2008 Paul Bakaus (ui.jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
;(function($) {

$.ui = {
	plugin: {
		add: function(module, option, set) {
			var proto = $.ui[module].prototype;
			for(var i in set) {
				proto.plugins[i] = proto.plugins[i] || [];
				proto.plugins[i].push([option, set[i]]);
			}
		},
		call: function(instance, name, args) {
			var set = instance.plugins[name];
			if(!set) { return; }
			
			for (var i = 0; i < set.length; i++) {
				if (instance.options[set[i][0]]) {
					set[i][1].apply(instance.element, args);
				}
			}
		}	
	},
	cssCache: {},
	css: function(name) {
		if ($.ui.cssCache[name]) { return $.ui.cssCache[name]; }
		var tmp = $('<div class="ui-gen">').addClass(name).css({position:'absolute', top:'-5000px', left:'-5000px', display:'block'}).appendTo('body');
		
		//if (!$.browser.safari)
			//tmp.appendTo('body'); 
		
		//Opera and Safari set width and height to 0px instead of auto
		//Safari returns rgba(0,0,0,0) when bgcolor is not set
		$.ui.cssCache[name] = !!(
			(!(/auto|default/).test(tmp.css('cursor')) || (/^[1-9]/).test(tmp.css('height')) || (/^[1-9]/).test(tmp.css('width')) || 
			!(/none/).test(tmp.css('backgroundImage')) || !(/transparent|rgba\(0, 0, 0, 0\)/).test(tmp.css('backgroundColor')))
		);
		try { $('body').get(0).removeChild(tmp.get(0));	} catch(e){}
		return $.ui.cssCache[name];
	},
	disableSelection: function(el) {
		$(el).attr('unselectable', 'on').css('MozUserSelect', 'none');
	},
	enableSelection: function(el) {
		$(el).attr('unselectable', 'off').css('MozUserSelect', '');
	},
	hasScroll: function(e, a) {
		var scroll = /top/.test(a||"top") ? 'scrollTop' : 'scrollLeft', has = false;
		if (e[scroll] > 0) return true; e[scroll] = 1;
		has = e[scroll] > 0 ? true : false; e[scroll] = 0;
		return has;
	}
};


/** jQuery core modifications and additions **/

var _remove = $.fn.remove;
$.fn.remove = function() {
	$("*", this).add(this).triggerHandler("remove");
	return _remove.apply(this, arguments );
};

// $.widget is a factory to create jQuery plugins
// taking some boilerplate code out of the plugin code
// created by Scott González and Jörn Zaefferer
function getter(namespace, plugin, method) {
	var methods = $[namespace][plugin].getter || [];
	methods = (typeof methods == "string" ? methods.split(/,?\s+/) : methods);
	return ($.inArray(method, methods) != -1);
}

$.widget = function(name, prototype) {
	var namespace = name.split(".")[0];
	name = name.split(".")[1];
	
	// create plugin method
	$.fn[name] = function(options) {
		var isMethodCall = (typeof options == 'string'),
			args = Array.prototype.slice.call(arguments, 1);
		
		if (isMethodCall && getter(namespace, name, options)) {
			var instance = $.data(this[0], name);
			return (instance ? instance[options].apply(instance, args)
				: undefined);
		}
		
		return this.each(function() {
			var instance = $.data(this, name);
			if (isMethodCall && instance && $.isFunction(instance[options])) {
				instance[options].apply(instance, args);
			} else if (!isMethodCall) {
				$.data(this, name, new $[namespace][name](this, options));
			}
		});
	};
	
	// create widget constructor
	$[namespace][name] = function(element, options) {
		var self = this;
		
		this.widgetName = name;
		this.widgetBaseClass = namespace + '-' + name;
		
		this.options = $.extend({}, $.widget.defaults, $[namespace][name].defaults, options);
		this.element = $(element)
			.bind('setData.' + name, function(e, key, value) {
				return self.setData(key, value);
			})
			.bind('getData.' + name, function(e, key) {
				return self.getData(key);
			})
			.bind('remove', function() {
				return self.destroy();
			});
		this.init();
	};
	
	// add widget prototype
	$[namespace][name].prototype = $.extend({}, $.widget.prototype, prototype);
};

$.widget.prototype = {
	init: function() {},
	destroy: function() {
		this.element.removeData(this.widgetName);
	},
	
	getData: function(key) {
		return this.options[key];
	},
	setData: function(key, value) {
		this.options[key] = value;
		
		if (key == 'disabled') {
			this.element[value ? 'addClass' : 'removeClass'](
				this.widgetBaseClass + '-disabled');
		}
	},
	
	enable: function() {
		this.setData('disabled', false);
	},
	disable: function() {
		this.setData('disabled', true);
	}
};

$.widget.defaults = {
	disabled: false
};


/** Mouse Interaction Plugin **/

$.ui.mouse = {
	mouseInit: function() {
		var self = this;
	
		this.element.bind('mousedown.'+this.widgetName, function(e) {
			return self.mouseDown(e);
		});
		
		// Prevent text selection in IE
		if ($.browser.msie) {
			this._mouseUnselectable = this.element.attr('unselectable');
			this.element.attr('unselectable', 'on');
		}
		
		this.started = false;
	},
	
	// TODO: make sure destroying one instance of mouse doesn't mess with
	// other instances of mouse
	mouseDestroy: function() {
		this.element.unbind('.'+this.widgetName);
		
		// Restore text selection in IE
		($.browser.msie
			&& this.element.attr('unselectable', this._mouseUnselectable));
	},
	
	mouseDown: function(e) {
		// we may have missed mouseup (out of window)
		(this._mouseStarted && this.mouseUp(e));
		
		this._mouseDownEvent = e;
		
		var self = this,
			btnIsLeft = (e.which == 1),
			elIsCancel = (typeof this.options.cancel == "string" ? $(e.target).parents().add(e.target).filter(this.options.cancel).length : false);
		if (!btnIsLeft || elIsCancel || !this.mouseCapture(e)) {
			return true;
		}
		
		this._mouseDelayMet = !this.options.delay;
		if (!this._mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function() {
				self._mouseDelayMet = true;
			}, this.options.delay);
		}
		
		if (this.mouseDistanceMet(e) && this.mouseDelayMet(e)) {
			this._mouseStarted = (this.mouseStart(e) !== false);
			if (!this._mouseStarted) {
				e.preventDefault();
				return true;
			}
		}
		
		// these delegates are required to keep context
		this._mouseMoveDelegate = function(e) {
			return self.mouseMove(e);
		};
		this._mouseUpDelegate = function(e) {
			return self.mouseUp(e);
		};
		$(document)
			.bind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.bind('mouseup.'+this.widgetName, this._mouseUpDelegate);
		
		return false;
	},
	
	mouseMove: function(e) {
		// IE mouseup check - mouseup happened when mouse was out of window
		if ($.browser.msie && !e.button) {
			return this.mouseUp(e);
		}
		
		if (this._mouseStarted) {
			this.mouseDrag(e);
			return false;
		}
		
		if (this.mouseDistanceMet(e) && this.mouseDelayMet(e)) {
			this._mouseStarted =
				(this.mouseStart(this._mouseDownEvent, e) !== false);
			(this._mouseStarted ? this.mouseDrag(e) : this.mouseUp(e));
		}
		
		return !this._mouseStarted;
	},
	
	mouseUp: function(e) {
		$(document)
			.unbind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.unbind('mouseup.'+this.widgetName, this._mouseUpDelegate);
		
		if (this._mouseStarted) {
			this._mouseStarted = false;
			this.mouseStop(e);
		}
		
		return false;
	},
	
	mouseDistanceMet: function(e) {
		return (Math.max(
				Math.abs(this._mouseDownEvent.pageX - e.pageX),
				Math.abs(this._mouseDownEvent.pageY - e.pageY)
			) >= this.options.distance
		);
	},
	
	mouseDelayMet: function(e) {
		return this._mouseDelayMet;
	},
	
	// These are placeholder methods, to be overriden by extending plugin
	mouseStart: function(e) {},
	mouseDrag: function(e) {},
	mouseStop: function(e) {},
	mouseCapture: function(e) { return true; }
};

$.ui.mouse.defaults = {
	cancel: null,
	distance: 1,
	delay: 0
};

})(jQuery);
/*!
 * TableSorter 2.0 - Client-side table sorting with ease!
 * Version 2.0.3
 * @requires jQuery v1.2.3
 * 
 * Copyright (c) 2007 Christian Bach
 * Examples and docs at: http://tablesorter.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
/**
 *
 * @description Create a sortable table with multi-column sorting capabilitys
 * 
 * @example $('table').tablesorter();
 * @desc Create a simple tablesorter interface.
 *
 * @example $('table').tablesorter({ sortList:[[0,0],[1,0]] });
 * @desc Create a tablesorter interface and sort on the first and secound column in ascending order.
 * 
 * @example $('table').tablesorter({ headers: { 0: { sorter: false}, 1: {sorter: false} } });
 * @desc Create a tablesorter interface and disableing the first and secound column headers.
 * 
 * @example $('table').tablesorter({ 0: {sorter:"integer"}, 1: {sorter:"currency"} });
 * @desc Create a tablesorter interface and set a column parser for the first and secound column.
 * 
 * 
 * @param Object settings An object literal containing key/value pairs to provide optional settings.
 * 
 * @option String cssHeader (optional) 			A string of the class name to be appended to sortable tr elements in the thead of the table. 
 * 												Default value: "header"
 * 
 * @option String cssAsc (optional) 			A string of the class name to be appended to sortable tr elements in the thead on a ascending sort. 
 * 												Default value: "headerSortUp"
 * 
 * @option String cssDesc (optional) 			A string of the class name to be appended to sortable tr elements in the thead on a descending sort. 
 * 												Default value: "headerSortDown"
 * 
 * @option String sortInitialOrder (optional) 	A string of the inital sorting order can be asc or desc. 
 * 												Default value: "asc"
 * 
 * @option String sortMultisortKey (optional) 	A string of the multi-column sort key. 
 * 												Default value: "shiftKey"
 * 
 * @option String textExtraction (optional) 	A string of the text-extraction method to use. 
 * 												For complex html structures inside td cell set this option to "complex", 
 * 												on large tables the complex option can be slow. 
 * 												Default value: "simple"
 * 
 * @option Object headers (optional) 			An array containing the forces sorting rules. 
 * 												This option let's you specify a default sorting rule. 
 * 												Default value: null
 * 
 * @option Array sortList (optional) 			An array containing the forces sorting rules. 
 * 												This option let's you specify a default sorting rule. 
 * 												Default value: null
 * 
 * @option Array sortForce (optional) 			An array containing forced sorting rules. 
 * 												This option let's you specify a default sorting rule, which is prepended to user-selected rules.
 * 												Default value: null
 *  
  * @option Array sortAppend (optional) 			An array containing forced sorting rules. 
 * 												This option let's you specify a default sorting rule, which is appended to user-selected rules.
 * 												Default value: null
 * 
 * @option Boolean widthFixed (optional) 		Boolean flag indicating if tablesorter should apply fixed widths to the table columns.
 * 												This is usefull when using the pager companion plugin.
 * 												This options requires the dimension jquery plugin.
 * 												Default value: false
 *
 * @option Boolean cancelSelection (optional) 	Boolean flag indicating if tablesorter should cancel selection of the table headers text.
 * 												Default value: true
 *
 * @option Boolean debug (optional) 			Boolean flag indicating if tablesorter should display debuging information usefull for development.
 *
 * @type jQuery
 *
 * @name tablesorter
 * 
 * @cat Plugins/Tablesorter
 * 
 * @author Christian Bach/christian.bach@polyester.se
 */

(function($) {
	$.extend({
		tablesorter: new function() {
			
			var parsers = [], widgets = [];
			
			this.defaults = {
				cssHeader: "header",
				cssAsc: "headerSortUp",
				cssDesc: "headerSortDown",
				sortInitialOrder: "asc",
				sortMultiSortKey: "shiftKey",
				sortForce: null,
				sortAppend: null,
				textExtraction: "simple",
				parsers: {}, 
				widgets: [],		
				widgetZebra: {css: ["even","odd"]},
				headers: {},
				widthFixed: false,
				cancelSelection: true,
				sortList: [],
				headerList: [],
				dateFormat: "us",
				decimal: '.',
				debug: false
			};
			
			/* debuging utils */
			function benchmark(s,d) {
				log(s + "," + (new Date().getTime() - d.getTime()) + "ms");
			}
			
			this.benchmark = benchmark;
			
			function log(s) {
				if (typeof console != "undefined" && typeof console.debug != "undefined") {
					console.log(s);
				} else {
					alert(s);
				}
			}
						
			/* parsers utils */
			function buildParserCache(table,$headers) {
				
				if(table.config.debug) { var parsersDebug = ""; }
				
				var rows = table.tBodies[0].rows;
				
				if(table.tBodies[0].rows[0]) {

					var list = [], cells = rows[0].cells, l = cells.length;
					
					for (var i=0;i < l; i++) {
						var p = false;
						
						if($.metadata && ($($headers[i]).metadata() && $($headers[i]).metadata().sorter)  ) {
						
							p = getParserById($($headers[i]).metadata().sorter);	
						
						} else if((table.config.headers[i] && table.config.headers[i].sorter)) {
	
							p = getParserById(table.config.headers[i].sorter);
						}
						if(!p) {
							p = detectParserForColumn(table,cells[i]);
						}
	
						if(table.config.debug) { parsersDebug += "column:" + i + " parser:" +p.id + "\n"; }
	
						list.push(p);
					}
				}
				
				if(table.config.debug) { log(parsersDebug); }

				return list;
			};
			
			function detectParserForColumn(table,node) {
				var l = parsers.length;
				for(var i=1; i < l; i++) {
					if(parsers[i].is($.trim(getElementText(table.config,node)),table,node)) {
						return parsers[i];
					}
				}
				// 0 is always the generic parser (text)
				return parsers[0];
			}
			
			function getParserById(name) {
				var l = parsers.length;
				for(var i=0; i < l; i++) {
					if(parsers[i].id.toLowerCase() == name.toLowerCase()) {	
						return parsers[i];
					}
				}
				return false;
			}
			
			/* utils */
			function buildCache(table) {
				
				if(table.config.debug) { var cacheTime = new Date(); }
				
				
				var totalRows = (table.tBodies[0] && table.tBodies[0].rows.length) || 0,
					totalCells = (table.tBodies[0].rows[0] && table.tBodies[0].rows[0].cells.length) || 0,
					parsers = table.config.parsers, 
					cache = {row: [], normalized: []};
				
					for (var i=0;i < totalRows; ++i) {
					
						/** Add the table data to main data array */
						var c = table.tBodies[0].rows[i], cols = [];
					
						cache.row.push($(c));
						
						for(var j=0; j < totalCells; ++j) {
							cols.push(parsers[j].format(getElementText(table.config,c.cells[j]),table,c.cells[j]));	
						}
												
						cols.push(i); // add position for rowCache
						cache.normalized.push(cols);
						cols = null;
					};
				
				if(table.config.debug) { benchmark("Building cache for " + totalRows + " rows:", cacheTime); }
				
				return cache;
			};
			
			function getElementText(config,node) {
				
				if(!node) return "";
								
				var t = "";
				
				if(config.textExtraction == "simple") {
					if(node.childNodes[0] && node.childNodes[0].hasChildNodes()) {
						t = node.childNodes[0].innerHTML;
					} else {
						t = node.innerHTML;
					}
				} else {
					if(typeof(config.textExtraction) == "function") {
						t = config.textExtraction(node);
					} else { 
						t = $(node).text();
					}	
				}
				return t;
			}
			
			function appendToTable(table,cache) {
				
				if(table.config.debug) {var appendTime = new Date()}
				
				var c = cache, 
					r = c.row, 
					n= c.normalized, 
					totalRows = n.length, 
					checkCell = (n[0].length-1), 
					tableBody = $(table.tBodies[0]),
					rows = [];
				
				for (var i=0;i < totalRows; i++) {
					rows.push(r[n[i][checkCell]]);	
					if(!table.config.appender) {
						
						var o = r[n[i][checkCell]];
						var l = o.length;
						for(var j=0; j < l; j++) {
							
							tableBody[0].appendChild(o[j]);
						
						}
						
						//tableBody.append(r[n[i][checkCell]]);
					}
				}	
				
				if(table.config.appender) {
				
					table.config.appender(table,rows);	
				}
				
				rows = null;
				
				if(table.config.debug) { benchmark("Rebuilt table:", appendTime); }
								
				//apply table widgets
				applyWidget(table);
				
				// trigger sortend
				setTimeout(function() {
					$(table).trigger("sortEnd");	
				},0);
				
			};
			
			function buildHeaders(table) {
				
				if(table.config.debug) { var time = new Date(); }
				
				var meta = ($.metadata) ? true : false, tableHeadersRows = [];
			
				for(var i = 0; i < table.tHead.rows.length; i++) { tableHeadersRows[i]=0; };
				
				$tableHeaders = $("thead th",table);
		
				$tableHeaders.each(function(index) {
							
					this.count = 0;
					this.column = index;
					this.order = formatSortingOrder(table.config.sortInitialOrder);
					
					if(checkHeaderMetadata(this) || checkHeaderOptions(table,index)) this.sortDisabled = true;
					
					if(!this.sortDisabled) {
						$(this).addClass(table.config.cssHeader);
					}
					
					// add cell to headerList
					table.config.headerList[index]= this;
				});
				
				if(table.config.debug) { benchmark("Built headers:", time); log($tableHeaders); }
				
				return $tableHeaders;
				
			};
						
		   	function checkCellColSpan(table, rows, row) {
                var arr = [], r = table.tHead.rows, c = r[row].cells;
				
				for(var i=0; i < c.length; i++) {
					var cell = c[i];
					
					if ( cell.colSpan > 1) { 
						arr = arr.concat(checkCellColSpan(table, headerArr,row++));
					} else  {
						if(table.tHead.length == 1 || (cell.rowSpan > 1 || !r[row+1])) {
							arr.push(cell);
						}
						//headerArr[row] = (i+row);
					}
				}
				return arr;
			};
			
			function checkHeaderMetadata(cell) {
				if(($.metadata) && ($(cell).metadata().sorter === false)) { return true; };
				return false;
			}
			
			function checkHeaderOptions(table,i) {	
				if((table.config.headers[i]) && (table.config.headers[i].sorter === false)) { return true; };
				return false;
			}
			
			function applyWidget(table) {
				var c = table.config.widgets;
				var l = c.length;
				for(var i=0; i < l; i++) {
					
					getWidgetById(c[i]).format(table);
				}
				
			}
			
			function getWidgetById(name) {
				var l = widgets.length;
				for(var i=0; i < l; i++) {
					if(widgets[i].id.toLowerCase() == name.toLowerCase() ) {
						return widgets[i]; 
					}
				}
			};
			
			function formatSortingOrder(v) {
				
				if(typeof(v) != "Number") {
					i = (v.toLowerCase() == "desc") ? 1 : 0;
				} else {
					i = (v == (0 || 1)) ? v : 0;
				}
				return i;
			}
			
			function isValueInArray(v, a) {
				var l = a.length;
				for(var i=0; i < l; i++) {
					if(a[i][0] == v) {
						return true;	
					}
				}
				return false;
			}
				
			function setHeadersCss(table,$headers, list, css) {
				// remove all header information
				$headers.removeClass(css[0]).removeClass(css[1]);
				
				var h = [];
				$headers.each(function(offset) {
						if(!this.sortDisabled) {
							h[this.column] = $(this);					
						}
				});
				
				var l = list.length; 
				for(var i=0; i < l; i++) {
					h[list[i][0]].addClass(css[list[i][1]]);
				}
			}
			
			function fixColumnWidth(table,$headers) {
				var c = table.config;
				if(c.widthFixed) {
					var colgroup = $('<colgroup>');
					$("tr:first td",table.tBodies[0]).each(function() {
						colgroup.append($('<col>').css('width',$(this).width()));
					});
					$(table).prepend(colgroup);
				};
			}
			
			function updateHeaderSortCount(table,sortList) {
				var c = table.config, l = sortList.length;
				for(var i=0; i < l; i++) {
					var s = sortList[i], o = c.headerList[s[0]];
					o.count = s[1];
					o.count++;
				}
			}
			
			/* sorting methods */
			function multisort(table,sortList,cache) {
				
				if(table.config.debug) { var sortTime = new Date(); }
				
				var dynamicExp = "var sortWrapper = function(a,b) {", l = sortList.length;
					
				for(var i=0; i < l; i++) {
					
					var c = sortList[i][0];
					var order = sortList[i][1];
					var s = (getCachedSortType(table.config.parsers,c) == "text") ? ((order == 0) ? "sortText" : "sortTextDesc") : ((order == 0) ? "sortNumeric" : "sortNumericDesc");
					
					var e = "e" + i;
					
					dynamicExp += "var " + e + " = " + s + "(a[" + c + "],b[" + c + "]); ";
					dynamicExp += "if(" + e + ") { return " + e + "; } ";
					dynamicExp += "else { ";
				}
				
				// if value is the same keep orignal order	
				var orgOrderCol = cache.normalized[0].length - 1;
				dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";
						
				for(var i=0; i < l; i++) {
					dynamicExp += "}; ";
				}
				
				dynamicExp += "return 0; ";	
				dynamicExp += "}; ";	
				
				eval(dynamicExp);
				
				cache.normalized.sort(sortWrapper);
				
				if(table.config.debug) { benchmark("Sorting on " + sortList.toString() + " and dir " + order+ " time:", sortTime); }
				
				return cache;
			};
			
			function sortText(a,b) {
				return ((a < b) ? -1 : ((a > b) ? 1 : 0));
			};
			
			function sortTextDesc(a,b) {
				return ((b < a) ? -1 : ((b > a) ? 1 : 0));
			};	
			
	 		function sortNumeric(a,b) {
				return a-b;
			};
			
			function sortNumericDesc(a,b) {
				return b-a;
			};
			
			function getCachedSortType(parsers,i) {
				return parsers[i].type;
			};
			
			/* public methods */
			this.construct = function(settings) {

				return this.each(function() {
					
					if(!this.tHead || !this.tBodies) return;
					
					var $this, $document,$headers, cache, config, shiftDown = 0, sortOrder;
					
					this.config = {};
					
					config = $.extend(this.config, $.tablesorter.defaults, settings);
					
					// store common expression for speed					
					$this = $(this);
					
					// build headers
					$headers = buildHeaders(this);
					
					// try to auto detect column type, and store in tables config
					this.config.parsers = buildParserCache(this,$headers);
					
					
					// build the cache for the tbody cells
					cache = buildCache(this);
					
					// get the css class names, could be done else where.
					var sortCSS = [config.cssDesc,config.cssAsc];
					
					// fixate columns if the users supplies the fixedWidth option
					fixColumnWidth(this);
					
					// apply event handling to headers
					// this is to big, perhaps break it out?
					$headers.click(function(e) {
						
						$this.trigger("sortStart");
						
						var totalRows = ($this[0].tBodies[0] && $this[0].tBodies[0].rows.length) || 0;
						
						if(!this.sortDisabled && totalRows > 0) {
							
							
							// store exp, for speed
							var $cell = $(this);
	
							// get current column index
							var i = this.column;
							
							// get current column sort order
							this.order = this.count++ % 2;
							
							// user only whants to sort on one column
							if(!e[config.sortMultiSortKey]) {
								
								// flush the sort list
								config.sortList = [];
								
								if(config.sortForce != null) {
									var a = config.sortForce; 
									for(var j=0; j < a.length; j++) {
										if(a[j][0] != i) {
											config.sortList.push(a[j]);
										}
									}
								}
								
								// add column to sort list
								config.sortList.push([i,this.order]);
							
							// multi column sorting
							} else {
								// the user has clicked on an all ready sortet column.
								if(isValueInArray(i,config.sortList)) {	 
									
									// revers the sorting direction for all tables.
									for(var j=0; j < config.sortList.length; j++) {
										var s = config.sortList[j], o = config.headerList[s[0]];
										if(s[0] == i) {
											o.count = s[1];
											o.count++;
											s[1] = o.count % 2;
										}
									}	
								} else {
									// add column to sort list array
									config.sortList.push([i,this.order]);
								}
							};
							setTimeout(function() {
								//set css for headers
								setHeadersCss($this[0],$headers,config.sortList,sortCSS);
								appendToTable($this[0],multisort($this[0],config.sortList,cache));
							},1);
							// stop normal event by returning false
							return false;
						}
					// cancel selection	
					}).mousedown(function() {
						if(config.cancelSelection) {
							this.onselectstart = function() {return false};
							return false;
						}
					});
					
					// apply easy methods that trigger binded events
					$this.bind("update",function() {
						
						// rebuild parsers.
						this.config.parsers = buildParserCache(this,$headers);
						
						// rebuild the cache map
						cache = buildCache(this);
						
					}).bind("sorton",function(e,list) {
						
						$(this).trigger("sortStart");
						
						config.sortList = list;
						
						// update and store the sortlist
						var sortList = config.sortList;
						
						// update header count index
						updateHeaderSortCount(this,sortList);
						
						//set css for headers
						setHeadersCss(this,$headers,sortList,sortCSS);
						
						
						// sort the table and append it to the dom
						appendToTable(this,multisort(this,sortList,cache));

					}).bind("appendCache",function() {
						
						appendToTable(this,cache);
					
					}).bind("applyWidgetId",function(e,id) {
						
						getWidgetById(id).format(this);
						
					}).bind("applyWidgets",function() {
						// apply widgets
						applyWidget(this);
					});
					
					if($.metadata && ($(this).metadata() && $(this).metadata().sortlist)) {
						config.sortList = $(this).metadata().sortlist;
					}
					// if user has supplied a sort list to constructor.
					if(config.sortList.length > 0) {
						$this.trigger("sorton",[config.sortList]);	
					}
					
					// apply widgets
					applyWidget(this);
				});
			};
			
			this.addParser = function(parser) {
				var l = parsers.length, a = true;
				for(var i=0; i < l; i++) {
					if(parsers[i].id.toLowerCase() == parser.id.toLowerCase()) {
						a = false;
					}
				}
				if(a) { parsers.push(parser); };
			};
			
			this.addWidget = function(widget) {
				widgets.push(widget);
			};
			
			this.formatFloat = function(s) {
				var i = parseFloat(s);
				return (isNaN(i)) ? 0 : i;
			};
			this.formatInt = function(s) {
				var i = parseInt(s);
				return (isNaN(i)) ? 0 : i;
			};
			
			this.isDigit = function(s,config) {
				var DECIMAL = '\\' + config.decimal;
				var exp = '/(^[+]?0(' + DECIMAL +'0+)?$)|(^([-+]?[1-9][0-9]*)$)|(^([-+]?((0?|[1-9][0-9]*)' + DECIMAL +'(0*[1-9][0-9]*)))$)|(^[-+]?[1-9]+[0-9]*' + DECIMAL +'0+$)/';
				return RegExp(exp).test($.trim(s));
			};
			
			this.clearTableBody = function(table) {
				if($.browser.msie) {
					function empty() {
						while ( this.firstChild ) this.removeChild( this.firstChild );
					}
					empty.apply(table.tBodies[0]);
				} else {
					table.tBodies[0].innerHTML = "";
				}
			};
		}
	});
	
	// extend plugin scope
	$.fn.extend({
        tablesorter: $.tablesorter.construct
	});
	
	var ts = $.tablesorter;
	
	// add default parsers
	ts.addParser({
		id: "text",
		is: function(s) {
			return true;
		},
		format: function(s) {
			return $.trim(s.toLowerCase());
		},
		type: "text"
	});
	
	ts.addParser({
		id: "digit",
		is: function(s,table) {
			var c = table.config;
			return $.tablesorter.isDigit(s,c);
		},
		format: function(s) {
			return $.tablesorter.formatFloat(s);
		},
		type: "numeric"
	});
	
	ts.addParser({
		id: "currency",
		is: function(s) {
			return /^[£$€?.]/.test(s);
		},
		format: function(s) {
			return $.tablesorter.formatFloat(s.replace(new RegExp(/[^0-9.]/g),""));
		},
		type: "numeric"
	});
	
	ts.addParser({
		id: "ipAddress",
		is: function(s) {
			return /^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s);
		},
		format: function(s) {
			var a = s.split("."), r = "", l = a.length;
			for(var i = 0; i < l; i++) {
				var item = a[i];
			   	if(item.length == 2) {
					r += "0" + item;
			   	} else {
					r += item;
			   	}
			}
			return $.tablesorter.formatFloat(r);
		},
		type: "numeric"
	});
	
	ts.addParser({
		id: "url",
		is: function(s) {
			return /^(https?|ftp|file):\/\/$/.test(s);
		},
		format: function(s) {
			return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//),''));
		},
		type: "text"
	});
	
	ts.addParser({
		id: "isoDate",
		is: function(s) {
			return /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s);
		},
		format: function(s) {
			return $.tablesorter.formatFloat((s != "") ? new Date(s.replace(new RegExp(/-/g),"/")).getTime() : "0");
		},
		type: "numeric"
	});
		
	ts.addParser({
		id: "percent",
		is: function(s) { 
			return /\%$/.test($.trim(s));
		},
		format: function(s) {
			return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g),""));
		},
		type: "numeric"
	});

	ts.addParser({
		id: "usLongDate",
		is: function(s) {
			return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/));
		},
		format: function(s) {
			return $.tablesorter.formatFloat(new Date(s).getTime());
		},
		type: "numeric"
	});

	ts.addParser({
		id: "shortDate",
		is: function(s) {
			return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s);
		},
		format: function(s,table) {
			var c = table.config;
			s = s.replace(/\-/g,"/");
			if(c.dateFormat == "us") {
				// reformat the string in ISO format
				s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2");
			} else if(c.dateFormat == "uk") {
				//reformat the string in ISO format
				s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1");
			} else if(c.dateFormat == "dd/mm/yy" || c.dateFormat == "dd-mm-yy") {
				s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3");	
			}
			return $.tablesorter.formatFloat(new Date(s).getTime());
		},
		type: "numeric"
	});

	ts.addParser({
	    id: "time",
	    is: function(s) {
	        return /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s);
	    },
	    format: function(s) {
	        return $.tablesorter.formatFloat(new Date("2000/01/01 " + s).getTime());
	    },
	  type: "numeric"
	});
	
	
	ts.addParser({
	    id: "metadata",
	    is: function(s) {
	        return false;
	    },
	    format: function(s,table,cell) {
			var c = table.config, p = (!c.parserMetadataName) ? 'sortValue' : c.parserMetadataName;
	        return $(cell).metadata()[p];
	    },
	  type: "numeric"
	});
	
	// add default widgets
	ts.addWidget({
		id: "zebra",
		format: function(table) {
			if(table.config.debug) { var time = new Date(); }
			$("tr:visible",table.tBodies[0])
	        .filter(':even')
	        .removeClass(table.config.widgetZebra.css[1]).addClass(table.config.widgetZebra.css[0])
	        .end().filter(':odd')
	        .removeClass(table.config.widgetZebra.css[0]).addClass(table.config.widgetZebra.css[1]);
			if(table.config.debug) { $.tablesorter.benchmark("Applying Zebra widget", time); }
		}
	});	
})(jQuery);
/*!
 * jQuery UI Draggable
 *
 * Copyright (c) 2008 Paul Bakaus
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	ui.core.js
 */
(function($) {

$.widget("ui.draggable", $.extend({}, $.ui.mouse, {
	init: function() {
		
		//Initialize needed constants
		var o = this.options;

		//Position the node
		if (o.helper == 'original' && !(/(relative|absolute|fixed)/).test(this.element.css('position')))
			this.element.css('position', 'relative');

		this.element.addClass('ui-draggable');
		(o.disabled && this.element.addClass('ui-draggable-disabled'));
		
		this.mouseInit();
		
	},
	mouseStart: function(e) {
		var o = this.options;
		
		if (this.helper || o.disabled || $(e.target).is('.ui-resizable-handle')) return false;
		
		var handle = !this.options.handle || !$(this.options.handle, this.element).length ? true : false;
		
	
		$(this.options.handle, this.element).find("*").andSelf().each(function() {
			if(this == e.target) handle = true;
		});
		if (!handle) return false;
		
		if($.ui.ddmanager) $.ui.ddmanager.current = this;
		
		//Create and append the visible helper
		this.helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [e])) : (o.helper == 'clone' ? this.element.clone() : this.element);
		if(!this.helper.parents('body').length) this.helper.appendTo((o.appendTo == 'parent' ? this.element[0].parentNode : o.appendTo));
		if(this.helper[0] != this.element[0] && !(/(fixed|absolute)/).test(this.helper.css("position"))) this.helper.css("position", "absolute");
		
		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */
		
		this.margins = {																				//Cache the margins
			left: (parseInt(this.element.css("marginLeft"),10) || 0),
			top: (parseInt(this.element.css("marginTop"),10) || 0)
		};		
		
		this.cssPosition = this.helper.css("position");													//Store the helper's css position
		this.offset = this.element.offset();															//The element's absolute position on the page
		this.offset = {																					//Substract the margins from the element's absolute offset
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};
		
		this.offset.click = {																			//Where the click happened, relative to the element
			left: e.pageX - this.offset.left,
			top: e.pageY - this.offset.top
		};
		
		this.offsetParent = this.helper.offsetParent(); var po = this.offsetParent.offset();			//Get the offsetParent and cache its position
		if(this.offsetParent[0] == document.body && $.browser.mozilla) po = { top: 0, left: 0 };		//Ugly FF3 fix
		this.offset.parent = {																			//Store its position plus border
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
		};
		
		var p = this.element.position();																//This is a relative to absolute position minus the actual position calculation - only used for relative positioned helpers
		this.offset.relative = this.cssPosition == "relative" ? {
			top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.offsetParent[0].scrollTop,
			left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.offsetParent[0].scrollLeft
		} : { top: 0, left: 0 };
		
		this.originalPosition = this.generatePosition(e);												//Generate the original position
		this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };//Cache the helper size
		
		if(o.cursorAt) {
			if(o.cursorAt.left != undefined) this.offset.click.left = o.cursorAt.left + this.margins.left;
			if(o.cursorAt.right != undefined) this.offset.click.left = this.helperProportions.width - o.cursorAt.right + this.margins.left;
			if(o.cursorAt.top != undefined) this.offset.click.top = o.cursorAt.top + this.margins.top;
			if(o.cursorAt.bottom != undefined) this.offset.click.top = this.helperProportions.height - o.cursorAt.bottom + this.margins.top;
		}
		
		
		/*
		 * - Position constraining -
		 * Here we prepare position constraining like grid and containment.
		 */	
		
		if(o.containment) {
			if(o.containment == 'parent') o.containment = this.helper[0].parentNode;
			if(o.containment == 'document' || o.containment == 'window') this.containment = [
				0 - this.offset.relative.left - this.offset.parent.left,
				0 - this.offset.relative.top - this.offset.parent.top,
				$(o.containment == 'document' ? document : window).width() - this.offset.relative.left - this.offset.parent.left - this.helperProportions.width - this.margins.left - (parseInt(this.element.css("marginRight"),10) || 0),
				($(o.containment == 'document' ? document : window).height() || document.body.parentNode.scrollHeight) - this.offset.relative.top - this.offset.parent.top - this.helperProportions.height - this.margins.top - (parseInt(this.element.css("marginBottom"),10) || 0)
			];
			
			if(!(/^(document|window|parent)$/).test(o.containment)) {
				var ce = $(o.containment)[0];
				var co = $(o.containment).offset();
				
				this.containment = [
					co.left + (parseInt($(ce).css("borderLeftWidth"),10) || 0) - this.offset.relative.left - this.offset.parent.left,
					co.top + (parseInt($(ce).css("borderTopWidth"),10) || 0) - this.offset.relative.top - this.offset.parent.top,
					co.left+Math.max(ce.scrollWidth,ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - this.offset.relative.left - this.offset.parent.left - this.helperProportions.width - this.margins.left - (parseInt(this.element.css("marginRight"),10) || 0),
					co.top+Math.max(ce.scrollHeight,ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - this.offset.relative.top - this.offset.parent.top - this.helperProportions.height - this.margins.top - (parseInt(this.element.css("marginBottom"),10) || 0)
				];
			}
		}
		
		//Call plugins and callbacks
		this.propagate("start", e);
		
		this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };//Recache the helper size
		if ($.ui.ddmanager && !o.dropBehaviour) $.ui.ddmanager.prepareOffsets(this, e);
		
		this.helper.addClass("ui-draggable-dragging");
		this.mouseDrag(e); //Execute the drag once - this causes the helper not to be visible before getting its correct position
		return true;
	},
	convertPositionTo: function(d, pos) {
		if(!pos) pos = this.position;
		var mod = d == "absolute" ? 1 : -1;
		return {
			top: (
				pos.top																	// the calculated relative position
				+ this.offset.relative.top	* mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.top * mod											// The offsetParent's offset without borders (offset + border)
				- (this.cssPosition == "fixed" || (this.cssPosition == "absolute" && this.offsetParent[0] == document.body) ? 0 : this.offsetParent[0].scrollTop) * mod	// The offsetParent's scroll position, not if the element is fixed
				+ (this.cssPosition == "fixed" ? $(document).scrollTop() : 0) * mod
				+ this.margins.top * mod												//Add the margin (you don't want the margin counting in intersection methods)
			),
			left: (
				pos.left																// the calculated relative position
				+ this.offset.relative.left	* mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.left * mod											// The offsetParent's offset without borders (offset + border)
				- (this.cssPosition == "fixed" || (this.cssPosition == "absolute" && this.offsetParent[0] == document.body) ? 0 : this.offsetParent[0].scrollLeft) * mod	// The offsetParent's scroll position, not if the element is fixed
				+ (this.cssPosition == "fixed" ? $(document).scrollLeft() : 0) * mod
				+ this.margins.left * mod												//Add the margin (you don't want the margin counting in intersection methods)
			)
		};
	},
	generatePosition: function(e) {
		
		var o = this.options;
		var position = {
			top: (
				e.pageY																	// The absolute mouse position
				- this.offset.click.top													// Click offset (relative to the element)
				- this.offset.relative.top												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.top												// The offsetParent's offset without borders (offset + border)
				+ (this.cssPosition == "fixed" || (this.cssPosition == "absolute" && this.offsetParent[0] == document.body) ? 0 : this.offsetParent[0].scrollTop)	// The offsetParent's scroll position, not if the element is fixed
				- (this.cssPosition == "fixed" ? $(document).scrollTop() : 0)
			),
			left: (
				e.pageX																	// The absolute mouse position
				- this.offset.click.left												// Click offset (relative to the element)
				- this.offset.relative.left												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.left												// The offsetParent's offset without borders (offset + border)
				+ (this.cssPosition == "fixed" || (this.cssPosition == "absolute" && this.offsetParent[0] == document.body) ? 0 : this.offsetParent[0].scrollLeft)	// The offsetParent's scroll position, not if the element is fixed
				- (this.cssPosition == "fixed" ? $(document).scrollLeft() : 0)
			)
		};
		
		if(!this.originalPosition) return position;										//If we are not dragging yet, we won't check for options
		
		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */
		if(this.containment) {
			if(position.left < this.containment[0]) position.left = this.containment[0];
			if(position.top < this.containment[1]) position.top = this.containment[1];
			if(position.left > this.containment[2]) position.left = this.containment[2];
			if(position.top > this.containment[3]) position.top = this.containment[3];
		}
		
		if(o.grid) {
			var top = this.originalPosition.top + Math.round((position.top - this.originalPosition.top) / o.grid[1]) * o.grid[1];
			position.top = this.containment ? (!(top < this.containment[1] || top > this.containment[3]) ? top : (!(top < this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;
			
			var left = this.originalPosition.left + Math.round((position.left - this.originalPosition.left) / o.grid[0]) * o.grid[0];
			position.left = this.containment ? (!(left < this.containment[0] || left > this.containment[2]) ? left : (!(left < this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
		}
		
		return position;
	},
	mouseDrag: function(e) {
		
		//Compute the helpers position
		this.position = this.generatePosition(e);
		this.positionAbs = this.convertPositionTo("absolute");
		
		//Call plugins and callbacks and use the resulting position if something is returned		
		this.position = this.propagate("drag", e) || this.position;
		
		if(!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left+'px';
		if(!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top+'px';
		if($.ui.ddmanager) $.ui.ddmanager.drag(this, e);
		
		return false;
	},
	mouseStop: function(e) {
		
		//If we are using droppables, inform the manager about the drop
		var dropped = false;
		if ($.ui.ddmanager && !this.options.dropBehaviour)
			var dropped = $.ui.ddmanager.drop(this, e);		
		
		if((this.options.revert == "invalid" && !dropped) || (this.options.revert == "valid" && dropped) || this.options.revert === true) {
			var self = this;
			$(this.helper).animate(this.originalPosition, parseInt(this.options.revert, 10) || 500, function() {
				self.propagate("stop", e);
				self.clear();
			});
		} else {
			this.propagate("stop", e);
			this.clear();
		}
		
		return false;
	},
	clear: function() {
		this.helper.removeClass("ui-draggable-dragging");
		if(this.options.helper != 'original' && !this.cancelHelperRemoval) this.helper.remove();
		//if($.ui.ddmanager) $.ui.ddmanager.current = null;
		this.helper = null;
		this.cancelHelperRemoval = false;
	},
	
	// From now on bulk stuff - mainly helpers
	plugins: {},
	uiHash: function(e) {
		return {
			helper: this.helper,
			position: this.position,
			absolutePosition: this.positionAbs,
			options: this.options			
		};
	},
	propagate: function(n,e) {
		$.ui.plugin.call(this, n, [e, this.uiHash()]);
		if(n == "drag") this.positionAbs = this.convertPositionTo("absolute"); //The absolute position has to be recalculated after plugins
		return this.element.triggerHandler(n == "drag" ? n : "drag"+n, [e, this.uiHash()], this.options[n]);
	},
	destroy: function() {
		if(!this.element.data('draggable')) return;
		this.element.removeData("draggable").unbind(".draggable").removeClass('ui-draggable');
		this.mouseDestroy();
	}
}));

$.extend($.ui.draggable, {
	defaults: {
		appendTo: "parent",
		axis: false,
		cancel: ":input",
		delay: 0,
		distance: 1,
		helper: "original"
	}
});

$.ui.plugin.add("draggable", "cursor", {
	start: function(e, ui) {
		var t = $('body');
		if (t.css("cursor")) ui.options._cursor = t.css("cursor");
		t.css("cursor", ui.options.cursor);
	},
	stop: function(e, ui) {
		if (ui.options._cursor) $('body').css("cursor", ui.options._cursor);
	}
});

$.ui.plugin.add("draggable", "zIndex", {
	start: function(e, ui) {
		var t = $(ui.helper);
		if(t.css("zIndex")) ui.options._zIndex = t.css("zIndex");
		t.css('zIndex', ui.options.zIndex);
	},
	stop: function(e, ui) {
		if(ui.options._zIndex) $(ui.helper).css('zIndex', ui.options._zIndex);
	}
});

$.ui.plugin.add("draggable", "opacity", {
	start: function(e, ui) {
		var t = $(ui.helper);
		if(t.css("opacity")) ui.options._opacity = t.css("opacity");
		t.css('opacity', ui.options.opacity);
	},
	stop: function(e, ui) {
		if(ui.options._opacity) $(ui.helper).css('opacity', ui.options._opacity);
	}
});

$.ui.plugin.add("draggable", "iframeFix", {
	start: function(e, ui) {
		$(ui.options.iframeFix === true ? "iframe" : ui.options.iframeFix).each(function() {					
			$('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>')
			.css({
				width: this.offsetWidth+"px", height: this.offsetHeight+"px",
				position: "absolute", opacity: "0.001", zIndex: 1000
			})
			.css($(this).offset())
			.appendTo("body");
		});
	},
	stop: function(e, ui) {
		$("div.DragDropIframeFix").each(function() { this.parentNode.removeChild(this); }); //Remove frame helpers	
	}
});

$.ui.plugin.add("draggable", "scroll", {
	start: function(e, ui) {
		var o = ui.options;
		var i = $(this).data("draggable");
		o.scrollSensitivity	= o.scrollSensitivity || 20;
		o.scrollSpeed		= o.scrollSpeed || 20;
		
		i.overflowY = function(el) {
			do { if(/auto|scroll/.test(el.css('overflow')) || (/auto|scroll/).test(el.css('overflow-y'))) return el; el = el.parent(); } while (el[0].parentNode);
			return $(document);
		}(this);
		i.overflowX = function(el) {
			do { if(/auto|scroll/.test(el.css('overflow')) || (/auto|scroll/).test(el.css('overflow-x'))) return el; el = el.parent(); } while (el[0].parentNode);
			return $(document);
		}(this);
		
		if(i.overflowY[0] != document && i.overflowY[0].tagName != 'HTML') i.overflowYOffset = i.overflowY.offset();
		if(i.overflowX[0] != document && i.overflowX[0].tagName != 'HTML') i.overflowXOffset = i.overflowX.offset();
		
	},
	drag: function(e, ui) {
		
		var o = ui.options;
		var i = $(this).data("draggable");
		
		if(i.overflowY[0] != document && i.overflowY[0].tagName != 'HTML') {
			if((i.overflowYOffset.top + i.overflowY[0].offsetHeight) - e.pageY < o.scrollSensitivity)
				i.overflowY[0].scrollTop = i.overflowY[0].scrollTop + o.scrollSpeed;
			if(e.pageY - i.overflowYOffset.top < o.scrollSensitivity)
				i.overflowY[0].scrollTop = i.overflowY[0].scrollTop - o.scrollSpeed;
							
		} else {
			if(e.pageY - $(document).scrollTop() < o.scrollSensitivity)
				$(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
			if($(window).height() - (e.pageY - $(document).scrollTop()) < o.scrollSensitivity)
				$(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
		}
		
		if(i.overflowX[0] != document && i.overflowX[0].tagName != 'HTML') {
			if((i.overflowXOffset.left + i.overflowX[0].offsetWidth) - e.pageX < o.scrollSensitivity)
				i.overflowX[0].scrollLeft = i.overflowX[0].scrollLeft + o.scrollSpeed;
			if(e.pageX - i.overflowXOffset.left < o.scrollSensitivity)
				i.overflowX[0].scrollLeft = i.overflowX[0].scrollLeft - o.scrollSpeed;
		} else {
			if(e.pageX - $(document).scrollLeft() < o.scrollSensitivity)
				$(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
			if($(window).width() - (e.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
				$(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
		}
		
	}
});

$.ui.plugin.add("draggable", "snap", {
	start: function(e, ui) {
		
		var inst = $(this).data("draggable");
		inst.snapElements = [];
		$(ui.options.snap === true ? '.ui-draggable' : ui.options.snap).each(function() {
			var $t = $(this); var $o = $t.offset();
			if(this != inst.element[0]) inst.snapElements.push({
				item: this,
				width: $t.outerWidth(), height: $t.outerHeight(),
				top: $o.top, left: $o.left
			});
		});
		
	},
	drag: function(e, ui) {
		
		var inst = $(this).data("draggable");
		var d = ui.options.snapTolerance || 20;
		var x1 = ui.absolutePosition.left, x2 = x1 + inst.helperProportions.width,
			y1 = ui.absolutePosition.top, y2 = y1 + inst.helperProportions.height;
		
		for (var i = inst.snapElements.length - 1; i >= 0; i--){
			
			var l = inst.snapElements[i].left, r = l + inst.snapElements[i].width, 
				t = inst.snapElements[i].top, b = t + inst.snapElements[i].height;
			
			//Yes, I know, this is insane ;)
			if(!((l-d < x1 && x1 < r+d && t-d < y1 && y1 < b+d) || (l-d < x1 && x1 < r+d && t-d < y2 && y2 < b+d) || (l-d < x2 && x2 < r+d && t-d < y1 && y1 < b+d) || (l-d < x2 && x2 < r+d && t-d < y2 && y2 < b+d))) continue;
			
			if(ui.options.snapMode != 'inner') {
				var ts = Math.abs(t - y2) <= 20;
				var bs = Math.abs(b - y1) <= 20;
				var ls = Math.abs(l - x2) <= 20;
				var rs = Math.abs(r - x1) <= 20;
				if(ts) ui.position.top = inst.convertPositionTo("relative", { top: t - inst.helperProportions.height, left: 0 }).top;
				if(bs) ui.position.top = inst.convertPositionTo("relative", { top: b, left: 0 }).top;
				if(ls) ui.position.left = inst.convertPositionTo("relative", { top: 0, left: l - inst.helperProportions.width }).left;
				if(rs) ui.position.left = inst.convertPositionTo("relative", { top: 0, left: r }).left;
			}
			
			if(ui.options.snapMode != 'outer') {
				var ts = Math.abs(t - y1) <= 20;
				var bs = Math.abs(b - y2) <= 20;
				var ls = Math.abs(l - x1) <= 20;
				var rs = Math.abs(r - x2) <= 20;
				if(ts) ui.position.top = inst.convertPositionTo("relative", { top: t, left: 0 }).top;
				if(bs) ui.position.top = inst.convertPositionTo("relative", { top: b - inst.helperProportions.height, left: 0 }).top;
				if(ls) ui.position.left = inst.convertPositionTo("relative", { top: 0, left: l }).left;
				if(rs) ui.position.left = inst.convertPositionTo("relative", { top: 0, left: r - inst.helperProportions.width }).left;
			}
			
		};
	}
});

$.ui.plugin.add("draggable", "connectToSortable", {
	start: function(e,ui) {
	
		var inst = $(this).data("draggable");
		inst.sortables = [];
		$(ui.options.connectToSortable).each(function() {
			if($.data(this, 'sortable')) {
				var sortable = $.data(this, 'sortable');
				inst.sortables.push({
					instance: sortable,
					shouldRevert: sortable.options.revert
				});
				sortable.refreshItems();	//Do a one-time refresh at start to refresh the containerCache	
				sortable.propagate("activate", e, inst);
			}
		});

	},
	stop: function(e,ui) {
		
		//If we are still over the sortable, we fake the stop event of the sortable, but also remove helper
		var inst = $(this).data("draggable");
		
		$.each(inst.sortables, function() {
			if(this.instance.isOver) {
				this.instance.isOver = 0;
				inst.cancelHelperRemoval = true; //Don't remove the helper in the draggable instance
				this.instance.cancelHelperRemoval = false; //Remove it in the sortable instance (so sortable plugins like revert still work)
				if(this.shouldRevert) this.instance.options.revert = true; //revert here
				this.instance.mouseStop(e);
				
				//Also propagate receive event, since the sortable is actually receiving a element
				this.instance.element.triggerHandler("sortreceive", [e, $.extend(this.instance.ui(), { sender: inst.element })], this.instance.options["receive"]);

				this.instance.options.helper = this.instance.options._helper;
			} else {
				this.instance.propagate("deactivate", e, inst);
			}

		});
		
	},
	drag: function(e,ui) {

		var inst = $(this).data("draggable"), self = this;
		
		var checkPos = function(o) {
				
			var l = o.left, r = l + o.width,
				t = o.top, b = t + o.height;

			return (l < (this.positionAbs.left + this.offset.click.left) && (this.positionAbs.left + this.offset.click.left) < r
					&& t < (this.positionAbs.top + this.offset.click.top) && (this.positionAbs.top + this.offset.click.top) < b);				
		};
		
		$.each(inst.sortables, function(i) {

			if(checkPos.call(inst, this.instance.containerCache)) {

				//If it intersects, we use a little isOver variable and set it once, so our move-in stuff gets fired only once
				if(!this.instance.isOver) {
					this.instance.isOver = 1;

					//Now we fake the start of dragging for the sortable instance,
					//by cloning the list group item, appending it to the sortable and using it as inst.currentItem
					//We can then fire the start event of the sortable with our passed browser event, and our own helper (so it doesn't create a new one)
					this.instance.currentItem = $(self).clone().appendTo(this.instance.element).data("sortable-item", true);
					this.instance.options._helper = this.instance.options.helper; //Store helper option to later restore it
					this.instance.options.helper = function() { return ui.helper[0]; };
				
					e.target = this.instance.currentItem[0];
					this.instance.mouseCapture(e, true);
					this.instance.mouseStart(e, true, true);

					//Because the browser event is way off the new appended portlet, we modify a couple of variables to reflect the changes
					this.instance.offset.click.top = inst.offset.click.top;
					this.instance.offset.click.left = inst.offset.click.left;
					this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left;
					this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top;
					
					inst.propagate("toSortable", e);
				
				}
				
				//Provided we did all the previous steps, we can fire the drag event of the sortable on every draggable drag, when it intersects with the sortable
				if(this.instance.currentItem) this.instance.mouseDrag(e);
				
			} else {
				
				//If it doesn't intersect with the sortable, and it intersected before,
				//we fake the drag stop of the sortable, but make sure it doesn't remove the helper by using cancelHelperRemoval
				if(this.instance.isOver) {
					this.instance.isOver = 0;
					this.instance.cancelHelperRemoval = true;
					this.instance.options.revert = false; //No revert here
					this.instance.mouseStop(e, true);
					this.instance.options.helper = this.instance.options._helper;
					
					//Now we remove our currentItem, the list group clone again, and the placeholder, and animate the helper back to it's original size
					this.instance.currentItem.remove();
					if(this.instance.placeholder) this.instance.placeholder.remove();
					
					inst.propagate("fromSortable", e);
				}
				
			};

		});

	}
});

$.ui.plugin.add("draggable", "stack", {
	start: function(e,ui) {
		var group = $.makeArray($(ui.options.stack.group)).sort(function(a,b) {
			return (parseInt($(a).css("zIndex"),10) || ui.options.stack.min) - (parseInt($(b).css("zIndex"),10) || ui.options.stack.min);
		});
		
		$(group).each(function(i) {
			this.style.zIndex = ui.options.stack.min + i;
		});
		
		this[0].style.zIndex = ui.options.stack.min + group.length;
	}
});

})(jQuery);
/*!
 * jQuery UI Droppable
 *
 * Copyright (c) 2008 Paul Bakaus
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://docs.jquery.com/UI/Droppables
 *
 * Depends:
 *	ui.core.js
 *	ui.draggable.js
 */
(function($) {

$.widget("ui.droppable", {
	init: function() {

		this.element.addClass("ui-droppable");
		this.isover = 0; this.isout = 1;
		
		//Prepare the passed options
		var o = this.options, accept = o.accept;
		o = $.extend(o, {
			accept: o.accept && o.accept.constructor == Function ? o.accept : function(d) {
				return $(d).is(accept);
			}
		});
		
		//Store the droppable's proportions
		this.proportions = { width: this.element[0].offsetWidth, height: this.element[0].offsetHeight };
		
		// Add the reference and positions to the manager
		$.ui.ddmanager.droppables.push(this);
		
	},
	plugins: {},
	ui: function(c) {
		return {
			draggable: (c.currentItem || c.element),
			helper: c.helper,
			position: c.position,
			absolutePosition: c.positionAbs,
			options: this.options,
			element: this.element
		};
	},
	destroy: function() {
		var drop = $.ui.ddmanager.droppables;
		for ( var i = 0; i < drop.length; i++ )
			if ( drop[i] == this )
				drop.splice(i, 1);
		
		this.element
			.removeClass("ui-droppable ui-droppable-disabled")
			.removeData("droppable")
			.unbind(".droppable");
	},
	over: function(e) {
		
		var draggable = $.ui.ddmanager.current;
		if (!draggable || (draggable.currentItem || draggable.element)[0] == this.element[0]) return; // Bail if draggable and droppable are same element
		
		if (this.options.accept.call(this.element,(draggable.currentItem || draggable.element))) {
			$.ui.plugin.call(this, 'over', [e, this.ui(draggable)]);
			this.element.triggerHandler("dropover", [e, this.ui(draggable)], this.options.over);
		}
		
	},
	out: function(e) {
		
		var draggable = $.ui.ddmanager.current;
		if (!draggable || (draggable.currentItem || draggable.element)[0] == this.element[0]) return; // Bail if draggable and droppable are same element
		
		if (this.options.accept.call(this.element,(draggable.currentItem || draggable.element))) {
			$.ui.plugin.call(this, 'out', [e, this.ui(draggable)]);
			this.element.triggerHandler("dropout", [e, this.ui(draggable)], this.options.out);
		}
		
	},
	drop: function(e,custom) {
		
		var draggable = custom || $.ui.ddmanager.current;
		if (!draggable || (draggable.currentItem || draggable.element)[0] == this.element[0]) return false; // Bail if draggable and droppable are same element
		
		var childrenIntersection = false;
		this.element.find(".ui-droppable").not(".ui-draggable-dragging").each(function() {
			var inst = $.data(this, 'droppable');
			if(inst.options.greedy && $.ui.intersect(draggable, $.extend(inst, { offset: inst.element.offset() }), inst.options.tolerance)) {
				childrenIntersection = true; return false;
			}
		});
		if(childrenIntersection) return false;
		
		if(this.options.accept.call(this.element,(draggable.currentItem || draggable.element))) {
			$.ui.plugin.call(this, 'drop', [e, this.ui(draggable)]);
			this.element.triggerHandler("drop", [e, this.ui(draggable)], this.options.drop);
			return true;
		}
		
		return false;
		
	},
	activate: function(e) {
		
		var draggable = $.ui.ddmanager.current;
		$.ui.plugin.call(this, 'activate', [e, this.ui(draggable)]);
		if(draggable) this.element.triggerHandler("dropactivate", [e, this.ui(draggable)], this.options.activate);
		
	},
	deactivate: function(e) {
		
		var draggable = $.ui.ddmanager.current;
		$.ui.plugin.call(this, 'deactivate', [e, this.ui(draggable)]);
		if(draggable) this.element.triggerHandler("dropdeactivate", [e, this.ui(draggable)], this.options.deactivate);
		
	}
});

$.extend($.ui.droppable, {
	defaults: {
		disabled: false,
		tolerance: 'intersect'
	}
});

$.ui.intersect = function(draggable, droppable, toleranceMode) {
	
	if (!droppable.offset) return false;
	
	var x1 = (draggable.positionAbs || draggable.position.absolute).left, x2 = x1 + draggable.helperProportions.width,
		y1 = (draggable.positionAbs || draggable.position.absolute).top, y2 = y1 + draggable.helperProportions.height;
	var l = droppable.offset.left, r = l + droppable.proportions.width,
		t = droppable.offset.top, b = t + droppable.proportions.height;
	
	switch (toleranceMode) {
		case 'fit':
			return (l < x1 && x2 < r
				&& t < y1 && y2 < b);
			break;
		case 'intersect':
			return (l < x1 + (draggable.helperProportions.width / 2) // Right Half
				&& x2 - (draggable.helperProportions.width / 2) < r // Left Half
				&& t < y1 + (draggable.helperProportions.height / 2) // Bottom Half
				&& y2 - (draggable.helperProportions.height / 2) < b ); // Top Half
			break;
		case 'pointer':
			return (l < ((draggable.positionAbs || draggable.position.absolute).left + (draggable.clickOffset || draggable.offset.click).left) && ((draggable.positionAbs || draggable.position.absolute).left + (draggable.clickOffset || draggable.offset.click).left) < r
				&& t < ((draggable.positionAbs || draggable.position.absolute).top + (draggable.clickOffset || draggable.offset.click).top) && ((draggable.positionAbs || draggable.position.absolute).top + (draggable.clickOffset || draggable.offset.click).top) < b);
			break;
		case 'touch':
			return (
					(y1 >= t && y1 <= b) ||	// Top edge touching
					(y2 >= t && y2 <= b) ||	// Bottom edge touching
					(y1 < t && y2 > b)		// Surrounded vertically
				) && (
					(x1 >= l && x1 <= r) ||	// Left edge touching
					(x2 >= l && x2 <= r) ||	// Right edge touching
					(x1 < l && x2 > r)		// Surrounded horizontally
				);
			break;
		default:
			return false;
			break;
		}
	
};

/*
	This manager tracks offsets of draggables and droppables
*/
$.ui.ddmanager = {
	current: null,
	droppables: [],
	prepareOffsets: function(t, e) {
		
		var m = $.ui.ddmanager.droppables;
		var type = e ? e.type : null; // workaround for #2317

		for (var i = 0; i < m.length; i++) {
			if(m[i].options.disabled || (t && !m[i].options.accept.call(m[i].element,(t.currentItem || t.element)))) continue;
			m[i].visible = m[i].element.css("display") != "none"; if(!m[i].visible) continue; //If the element is not visible, continue
			m[i].offset = m[i].element.offset();
			m[i].proportions = { width: m[i].element[0].offsetWidth, height: m[i].element[0].offsetHeight };
			
			if(type == "dragstart" || type == "sortactivate") m[i].activate.call(m[i], e); //Activate the droppable if used directly from draggables
		}
		
	},
	drop: function(draggable, e) {
		
		var dropped = false;
		$.each($.ui.ddmanager.droppables, function() {
			
			if(!this.options) return;
			if (!this.options.disabled && this.visible && $.ui.intersect(draggable, this, this.options.tolerance))
				dropped = this.drop.call(this, e);
			
			if (!this.options.disabled && this.visible && this.options.accept.call(this.element,(draggable.currentItem || draggable.element))) {
				this.isout = 1; this.isover = 0;
				this.deactivate.call(this, e);
			}
			
		});
		return dropped;
		
	},
	drag: function(draggable, e) {
		
		//If you have a highly dynamic page, you might try this option. It renders positions every time you move the mouse.
		if(draggable.options.refreshPositions) $.ui.ddmanager.prepareOffsets(draggable, e);
		
		//Run through all droppables and check their positions based on specific tolerance options

		$.each($.ui.ddmanager.droppables, function() {
			
			if(this.options.disabled || this.greedyChild || !this.visible) return;
			var intersects = $.ui.intersect(draggable, this, this.options.tolerance);
			
			var c = !intersects && this.isover == 1 ? 'isout' : (intersects && this.isover == 0 ? 'isover' : null);
			if(!c) return;
			
			var parentInstance;
			if (this.options.greedy) {
				var parent = this.element.parents('.ui-droppable:eq(0)');
				if (parent.length) {
					parentInstance = $.data(parent[0], 'droppable');
					parentInstance.greedyChild = (c == 'isover' ? 1 : 0);
				}
			}
			
			// we just moved into a greedy child
			if (parentInstance && c == 'isover') {
				parentInstance['isover'] = 0;
				parentInstance['isout'] = 1;
				parentInstance.out.call(parentInstance, e);
			}
			
			this[c] = 1; this[c == 'isout' ? 'isover' : 'isout'] = 0;
			this[c == "isover" ? "over" : "out"].call(this, e);
			
			// we just moved out of a greedy child
			if (parentInstance && c == 'isout') {
				parentInstance['isout'] = 0;
				parentInstance['isover'] = 1;
				parentInstance.over.call(parentInstance, e);
			}
		});
		
	}
};

/*
 * Droppable Extensions
 */

$.ui.plugin.add("droppable", "activeClass", {
	activate: function(e, ui) {
		$(this).addClass(ui.options.activeClass);
	},
	deactivate: function(e, ui) {
		$(this).removeClass(ui.options.activeClass);
	},
	drop: function(e, ui) {
		$(this).removeClass(ui.options.activeClass);
	}
});

$.ui.plugin.add("droppable", "hoverClass", {
	over: function(e, ui) {
		$(this).addClass(ui.options.hoverClass);
	},
	out: function(e, ui) {
		$(this).removeClass(ui.options.hoverClass);
	},
	drop: function(e, ui) {
		$(this).removeClass(ui.options.hoverClass);
	}
});

})(jQuery);
/*!
 * jQuery UI Sortable
 *
 * Copyright (c) 2008 Paul Bakaus
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	ui.core.js
 */
(function($) {

function contains(a, b) { 
    var safari2 = $.browser.safari && $.browser.version < 522; 
    if (a.contains && !safari2) { 
        return a.contains(b); 
    } 
    if (a.compareDocumentPosition) 
        return !!(a.compareDocumentPosition(b) & 16); 
    while (b = b.parentNode) 
          if (b == a) return true; 
    return false; 
};

$.widget("ui.sortable", $.extend({}, $.ui.mouse, {
	init: function() {

		var o = this.options;
		this.containerCache = {};
		this.element.addClass("ui-sortable");
	
		//Get the items
		this.refresh();

		//Let's determine if the items are floating
		this.floating = this.items.length ? (/left|right/).test(this.items[0].item.css('float')) : false;
		
		//Let's determine the parent's offset
		if(!(/(relative|absolute|fixed)/).test(this.element.css('position'))) this.element.css('position', 'relative');
		this.offset = this.element.offset();

		//Initialize mouse events for interaction
		this.mouseInit();
		
	},
	plugins: {},
	ui: function(inst) {
		return {
			helper: (inst || this)["helper"],
			placeholder: (inst || this)["placeholder"] || $([]),
			position: (inst || this)["position"],
			absolutePosition: (inst || this)["positionAbs"],
			options: this.options,
			element: this.element,
			item: (inst || this)["currentItem"],
			sender: inst ? inst.element : null
		};		
	},
	propagate: function(n,e,inst, noPropagation) {
		$.ui.plugin.call(this, n, [e, this.ui(inst)]);
		if(!noPropagation) this.element.triggerHandler(n == "sort" ? n : "sort"+n, [e, this.ui(inst)], this.options[n]);
	},
	serialize: function(o) {

		var items = ($.isFunction(this.options.items) ? this.options.items.call(this.element) : $(this.options.items, this.element)).not('.ui-sortable-helper'); //Only the items of the sortable itself
		var str = []; o = o || {};
		
		items.each(function() {
			var res = ($(this).attr(o.attribute || 'id') || '').match(o.expression || (/(.+)[-=_](.+)/));
			if(res) str.push((o.key || res[1])+'[]='+(o.key && o.expression ? res[1] : res[2]));
		});
		
		return str.join('&');
		
	},
	toArray: function(attr) {
		
		var items = ($.isFunction(this.options.items) ? this.options.items.call(this.element) : $(this.options.items, this.element)).not('.ui-sortable-helper'); //Only the items of the sortable itself
		var ret = [];

		items.each(function() { ret.push($(this).attr(attr || 'id')); });
		return ret;
		
	},
	/* Be careful with the following core functions */
	intersectsWith: function(item) {
		
		var x1 = this.positionAbs.left, x2 = x1 + this.helperProportions.width,
		y1 = this.positionAbs.top, y2 = y1 + this.helperProportions.height;
		var l = item.left, r = l + item.width, 
		t = item.top, b = t + item.height;

		if(this.options.tolerance == "pointer" || this.options.forcePointerForContainers || (this.options.tolerance == "guess" && this.helperProportions[this.floating ? 'width' : 'height'] > item[this.floating ? 'width' : 'height'])) {
			return (y1 + this.offset.click.top > t && y1 + this.offset.click.top < b && x1 + this.offset.click.left > l && x1 + this.offset.click.left < r);
		} else {
		
			return (l < x1 + (this.helperProportions.width / 2) // Right Half
				&& x2 - (this.helperProportions.width / 2) < r // Left Half
				&& t < y1 + (this.helperProportions.height / 2) // Bottom Half
				&& y2 - (this.helperProportions.height / 2) < b ); // Top Half
		
		}
		
	},
	intersectsWithEdge: function(item) {	
		var x1 = this.positionAbs.left, x2 = x1 + this.helperProportions.width,
			y1 = this.positionAbs.top, y2 = y1 + this.helperProportions.height;
		var l = item.left, r = l + item.width, 
			t = item.top, b = t + item.height;

		if(this.options.tolerance == "pointer" || (this.options.tolerance == "guess" && this.helperProportions[this.floating ? 'width' : 'height'] > item[this.floating ? 'width' : 'height'])) {

			if(!(y1 + this.offset.click.top > t && y1 + this.offset.click.top < b && x1 + this.offset.click.left > l && x1 + this.offset.click.left < r)) return false;
			
			if(this.floating) {
				if(x1 + this.offset.click.left > l && x1 + this.offset.click.left < l + item.width/2) return 2;
				if(x1 + this.offset.click.left > l+item.width/2 && x1 + this.offset.click.left < r) return 1;
			} else {
				if(y1 + this.offset.click.top > t && y1 + this.offset.click.top < t + item.height/2) return 2;
				if(y1 + this.offset.click.top > t+item.height/2 && y1 + this.offset.click.top < b) return 1;
			}

		} else {
		
			if (!(l < x1 + (this.helperProportions.width / 2) // Right Half
				&& x2 - (this.helperProportions.width / 2) < r // Left Half
				&& t < y1 + (this.helperProportions.height / 2) // Bottom Half
				&& y2 - (this.helperProportions.height / 2) < b )) return false; // Top Half
			
			if(this.floating) {
				if(x2 > l && x1 < l) return 2; //Crosses left edge
				if(x1 < r && x2 > r) return 1; //Crosses right edge
			} else {
				if(y2 > t && y1 < t) return 1; //Crosses top edge
				if(y1 < b && y2 > b) return 2; //Crosses bottom edge
			}
		
		}
		
		return false;
		
	},
	refresh: function() {
		this.refreshItems();
		this.refreshPositions();
	},
	refreshItems: function() {
		
		this.items = [];
		this.containers = [this];
		var items = this.items;
		var self = this;
		var queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : $(this.options.items, this.element), this]];
	
		if(this.options.connectWith) {
			for (var i = this.options.connectWith.length - 1; i >= 0; i--){
				var cur = $(this.options.connectWith[i]);
				for (var j = cur.length - 1; j >= 0; j--){
					var inst = $.data(cur[j], 'sortable');
					if(inst && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element), inst]);
						this.containers.push(inst);
					}
				};
			};
		}

		for (var i = queries.length - 1; i >= 0; i--){
			queries[i][0].each(function() {
				$.data(this, 'sortable-item', queries[i][1]); // Data for target checking (mouse manager)
				items.push({
					item: $(this),
					instance: queries[i][1],
					width: 0, height: 0,
					left: 0, top: 0
				});
			});
		};

	},
	refreshPositions: function(fast) {

		//This has to be redone because due to the item being moved out/into the offsetParent, the offsetParent's position will change
		if(this.offsetParent) {
			var po = this.offsetParent.offset();
			this.offset.parent = { top: po.top + this.offsetParentBorders.top, left: po.left + this.offsetParentBorders.left };
		}

		for (var i = this.items.length - 1; i >= 0; i--){		
			
			//We ignore calculating positions of all connected containers when we're not over them
			if(this.items[i].instance != this.currentContainer && this.currentContainer && this.items[i].item[0] != this.currentItem[0])
				continue;
				
			var t = this.options.toleranceElement ? $(this.options.toleranceElement, this.items[i].item) : this.items[i].item;
			
			if(!fast) {
				this.items[i].width = t[0].offsetWidth;
				this.items[i].height = t[0].offsetHeight;
			}
			
			var p = t.offset();
			this.items[i].left = p.left;
			this.items[i].top = p.top;
			
		};

		if(this.options.custom && this.options.custom.refreshContainers) {
			this.options.custom.refreshContainers.call(this);
		} else {
			for (var i = this.containers.length - 1; i >= 0; i--){
				var p =this.containers[i].element.offset();
				this.containers[i].containerCache.left = p.left;
				this.containers[i].containerCache.top = p.top;
				this.containers[i].containerCache.width	= this.containers[i].element.outerWidth();
				this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
			};
		}

	},
	destroy: function() {
		this.element
			.removeClass("ui-sortable ui-sortable-disabled")
			.removeData("sortable")
			.unbind(".sortable");
		this.mouseDestroy();
		
		for ( var i = this.items.length - 1; i >= 0; i-- )
			this.items[i].item.removeData("sortable-item");
	},
	createPlaceholder: function(that) {
		
		var self = that || this, o = self.options;

		if(o.placeholder.constructor == String) {
			var className = o.placeholder;
			o.placeholder = {
				element: function() {
					return $('<div></div>').addClass(className)[0];
				},
				update: function(i, p) {
					p.css(i.offset()).css({ width: i.outerWidth(), height: i.outerHeight() });
				}
			};
		}
		
		self.placeholder = $(o.placeholder.element.call(self.element, self.currentItem)).appendTo('body').css({ position: 'absolute' });
		o.placeholder.update.call(self.element, self.currentItem, self.placeholder);
	},
	contactContainers: function(e) {
		for (var i = this.containers.length - 1; i >= 0; i--){

			if(this.intersectsWith(this.containers[i].containerCache)) {
				if(!this.containers[i].containerCache.over) {
					

					if(this.currentContainer != this.containers[i]) {
						
						//When entering a new container, we will find the item with the least distance and append our item near it
						var dist = 10000; var itemWithLeastDistance = null; var base = this.positionAbs[this.containers[i].floating ? 'left' : 'top'];
						for (var j = this.items.length - 1; j >= 0; j--) {
							if(!contains(this.containers[i].element[0], this.items[j].item[0])) continue;
							var cur = this.items[j][this.containers[i].floating ? 'left' : 'top'];
							if(Math.abs(cur - base) < dist) {
								dist = Math.abs(cur - base); itemWithLeastDistance = this.items[j];
							}
						}
						
						if(!itemWithLeastDistance && !this.options.dropOnEmpty) //Check if dropOnEmpty is enabled
							continue;
						
						//We also need to exchange the placeholder
						if(this.placeholder) this.placeholder.remove();
						if(this.containers[i].options.placeholder) {
							this.containers[i].createPlaceholder(this);
						} else {
							this.placeholder = null;;
						}
						
						this.currentContainer = this.containers[i];
						itemWithLeastDistance ? this.rearrange(e, itemWithLeastDistance, null, true) : this.rearrange(e, null, this.containers[i].element, true);
						this.propagate("change", e); //Call plugins and callbacks
						this.containers[i].propagate("change", e, this); //Call plugins and callbacks

					}
					
					this.containers[i].propagate("over", e, this);
					this.containers[i].containerCache.over = 1;
				}
			} else {
				if(this.containers[i].containerCache.over) {
					this.containers[i].propagate("out", e, this);
					this.containers[i].containerCache.over = 0;
				}
			}
			
		};			
	},
	mouseCapture: function(e, overrideHandle) {
	
		if(this.options.disabled || this.options.type == 'static') return false;

		//We have to refresh the items data once first
		this.refreshItems();

		//Find out if the clicked node (or one of its parents) is a actual item in this.items
		var currentItem = null, self = this, nodes = $(e.target).parents().each(function() {	
			if($.data(this, 'sortable-item') == self) {
				currentItem = $(this);
				return false;
			}
		});
		if($.data(e.target, 'sortable-item') == self) currentItem = $(e.target);

		if(!currentItem) return false;
		if(this.options.handle && !overrideHandle) {
			var validHandle = false;
			
			$(this.options.handle, currentItem).find("*").andSelf().each(function() { if(this == e.target) validHandle = true; });
			if(!validHandle) return false;
		}
			
		this.currentItem = currentItem;
		return true;	
			
	},
	mouseStart: function(e, overrideHandle, noActivation) {

		var o = this.options;
		this.currentContainer = this;

		//We only need to call refreshPositions, because the refreshItems call has been moved to mouseCapture
		this.refreshPositions();

		//Create and append the visible helper			
		this.helper = typeof o.helper == 'function' ? $(o.helper.apply(this.element[0], [e, this.currentItem])) : this.currentItem.clone();
		if (!this.helper.parents('body').length) $(o.appendTo != 'parent' ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(this.helper[0]); //Add the helper to the DOM if that didn't happen already
		this.helper.css({ position: 'absolute', clear: 'both' }).addClass('ui-sortable-helper'); //Position it absolutely and add a helper class

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		this.margins = {																				//Cache the margins
			left: (parseInt(this.currentItem.css("marginLeft"),10) || 0),
			top: (parseInt(this.currentItem.css("marginTop"),10) || 0)
		};		
	
		this.offset = this.currentItem.offset();														//The element's absolute position on the page
		this.offset = {																					//Substract the margins from the element's absolute offset
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};
		
		this.offset.click = {																			//Where the click happened, relative to the element
			left: e.pageX - this.offset.left,
			top: e.pageY - this.offset.top
		};
		
		this.offsetParent = this.helper.offsetParent();													//Get the offsetParent and cache its position
		var po = this.offsetParent.offset();			

		this.offsetParentBorders = {
			top: (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
			left: (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
		};
		this.offset.parent = {																			//Store its position plus border
			top: po.top + this.offsetParentBorders.top,
			left: po.left + this.offsetParentBorders.left
		};
	
		this.originalPosition = this.generatePosition(e);												//Generate the original position
		this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] };  //Cache the former DOM position
		
		//If o.placeholder is used, create a new element at the given position with the class
		this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };//Cache the helper size
		if(o.placeholder) this.createPlaceholder();
		
		//Call plugins and callbacks
		this.propagate("start", e);
		this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };//Recache the helper size
		
		if(o.cursorAt) {
			if(o.cursorAt.left != undefined) this.offset.click.left = o.cursorAt.left;
			if(o.cursorAt.right != undefined) this.offset.click.left = this.helperProportions.width - o.cursorAt.right;
			if(o.cursorAt.top != undefined) this.offset.click.top = o.cursorAt.top;
			if(o.cursorAt.bottom != undefined) this.offset.click.top = this.helperProportions.height - o.cursorAt.bottom;
		}

		/*
		 * - Position constraining -
		 * Here we prepare position constraining like grid and containment.
		 */	
		
		if(o.containment) {
			if(o.containment == 'parent') o.containment = this.helper[0].parentNode;
			if(o.containment == 'document' || o.containment == 'window') this.containment = [
				0 - this.offset.parent.left,
				0 - this.offset.parent.top,
				$(o.containment == 'document' ? document : window).width() - this.offset.parent.left - this.helperProportions.width - this.margins.left - (parseInt(this.element.css("marginRight"),10) || 0),
				($(o.containment == 'document' ? document : window).height() || document.body.parentNode.scrollHeight) - this.offset.parent.top - this.helperProportions.height - this.margins.top - (parseInt(this.element.css("marginBottom"),10) || 0)
			];

			if(!(/^(document|window|parent)$/).test(o.containment)) {
				var ce = $(o.containment)[0];
				var co = $(o.containment).offset();
				
				this.containment = [
					co.left + (parseInt($(ce).css("borderLeftWidth"),10) || 0) - this.offset.parent.left,
					co.top + (parseInt($(ce).css("borderTopWidth"),10) || 0) - this.offset.parent.top,
					co.left+Math.max(ce.scrollWidth,ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - this.offset.parent.left - this.helperProportions.width - this.margins.left - (parseInt(this.currentItem.css("marginRight"),10) || 0),
					co.top+Math.max(ce.scrollHeight,ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - this.offset.parent.top - this.helperProportions.height - this.margins.top - (parseInt(this.currentItem.css("marginBottom"),10) || 0)
				];
			}
		}

		//Set the original element visibility to hidden to still fill out the white space
		if(this.options.placeholder != 'clone')
			this.currentItem.css('visibility', 'hidden');
		
		//Post 'activate' events to possible containers
		if(!noActivation) {
			 for (var i = this.containers.length - 1; i >= 0; i--) { this.containers[i].propagate("activate", e, this); }
		}
		
		//Prepare possible droppables
		if($.ui.ddmanager) $.ui.ddmanager.current = this;
		if ($.ui.ddmanager && !o.dropBehaviour) $.ui.ddmanager.prepareOffsets(this, e);

		this.dragging = true;

		this.mouseDrag(e); //Execute the drag once - this causes the helper not to be visible before getting its correct position
		return true;


	},
	convertPositionTo: function(d, pos) {
		if(!pos) pos = this.position;
		var mod = d == "absolute" ? 1 : -1;
		return {
			top: (
				pos.top																	// the calculated relative position
				+ this.offset.parent.top * mod											// The offsetParent's offset without borders (offset + border)
				- (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop) * mod	// The offsetParent's scroll position
				+ this.margins.top * mod												//Add the margin (you don't want the margin counting in intersection methods)
			),
			left: (
				pos.left																// the calculated relative position
				+ this.offset.parent.left * mod											// The offsetParent's offset without borders (offset + border)
				- (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft) * mod	// The offsetParent's scroll position
				+ this.margins.left * mod												//Add the margin (you don't want the margin counting in intersection methods)
			)
		};
	},
	generatePosition: function(e) {
		
		var o = this.options;
		var position = {
			top: (
				e.pageY																	// The absolute mouse position
				- this.offset.click.top													// Click offset (relative to the element)
				- this.offset.parent.top												// The offsetParent's offset without borders (offset + border)
				+ (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)	// The offsetParent's scroll position, not if the element is fixed
			),
			left: (
				e.pageX																	// The absolute mouse position
				- this.offset.click.left												// Click offset (relative to the element)
				- this.offset.parent.left												// The offsetParent's offset without borders (offset + border)
				+ (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft)	// The offsetParent's scroll position, not if the element is fixed
			)
		};
		
		if(!this.originalPosition) return position;										//If we are not dragging yet, we won't check for options
		
		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */
		if(this.containment) {
			if(position.left < this.containment[0]) position.left = this.containment[0];
			if(position.top < this.containment[1]) position.top = this.containment[1];
			if(position.left > this.containment[2]) position.left = this.containment[2];
			if(position.top > this.containment[3]) position.top = this.containment[3];
		}
		
		if(o.grid) {
			var top = this.originalPosition.top + Math.round((position.top - this.originalPosition.top) / o.grid[1]) * o.grid[1];
			position.top = this.containment ? (!(top < this.containment[1] || top > this.containment[3]) ? top : (!(top < this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;
			
			var left = this.originalPosition.left + Math.round((position.left - this.originalPosition.left) / o.grid[0]) * o.grid[0];
			position.left = this.containment ? (!(left < this.containment[0] || left > this.containment[2]) ? left : (!(left < this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
		}
		
		return position;
	},
	mouseDrag: function(e) {

		//Compute the helpers position
		this.position = this.generatePosition(e);
		this.positionAbs = this.convertPositionTo("absolute");

		//Call the internal plugins
		$.ui.plugin.call(this, "sort", [e, this.ui()]);
		
		//Regenerate the absolute position used for position checks
		this.positionAbs = this.convertPositionTo("absolute");
		
		//Set the helper's position
		this.helper[0].style.left = this.position.left+'px';
		this.helper[0].style.top = this.position.top+'px';

		//Rearrange
		for (var i = this.items.length - 1; i >= 0; i--) {
			var intersection = this.intersectsWithEdge(this.items[i]);
			if(!intersection) continue;
			
			if(this.items[i].item[0] != this.currentItem[0] //cannot intersect with itself
				&&	this.currentItem[intersection == 1 ? "next" : "prev"]()[0] != this.items[i].item[0] //no useless actions that have been done before
				&&	!contains(this.currentItem[0], this.items[i].item[0]) //no action if the item moved is the parent of the item checked
				&& (this.options.type == 'semi-dynamic' ? !contains(this.element[0], this.items[i].item[0]) : true)
			) {
				
				this.direction = intersection == 1 ? "down" : "up";
				this.rearrange(e, this.items[i]);
				this.propagate("change", e); //Call plugins and callbacks
				break;
			}
		}
		
		//Post events to containers
		this.contactContainers(e);
		
		//Interconnect with droppables
		if($.ui.ddmanager) $.ui.ddmanager.drag(this, e);

		//Call callbacks
		this.element.triggerHandler("sort", [e, this.ui()], this.options["sort"]);

		return false;
		
	},
	rearrange: function(e, i, a, hardRefresh) {
		a ? a[0].appendChild(this.currentItem[0]) : i.item[0].parentNode.insertBefore(this.currentItem[0], (this.direction == 'down' ? i.item[0] : i.item[0].nextSibling));
		
		//Various things done here to improve the performance:
		// 1. we create a setTimeout, that calls refreshPositions
		// 2. on the instance, we have a counter variable, that get's higher after every append
		// 3. on the local scope, we copy the counter variable, and check in the timeout, if it's still the same
		// 4. this lets only the last addition to the timeout stack through
		this.counter = this.counter ? ++this.counter : 1;
		var self = this, counter = this.counter;

		window.setTimeout(function() {
			if(counter == self.counter) self.refreshPositions(!hardRefresh); //Precompute after each DOM insertion, NOT on mousemove
		},0);
		
		if(this.options.placeholder)
			this.options.placeholder.update.call(this.element, this.currentItem, this.placeholder);
	},
	mouseStop: function(e, noPropagation) {

		//If we are using droppables, inform the manager about the drop
		if ($.ui.ddmanager && !this.options.dropBehaviour)
			$.ui.ddmanager.drop(this, e);
			
		if(this.options.revert) {
			var self = this;
			var cur = self.currentItem.offset();

			//Also animate the placeholder if we have one
			if(self.placeholder) self.placeholder.animate({ opacity: 'hide' }, (parseInt(this.options.revert, 10) || 500)-50);

			$(this.helper).animate({
				left: cur.left - this.offset.parent.left - self.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
				top: cur.top - this.offset.parent.top - self.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
			}, parseInt(this.options.revert, 10) || 500, function() {
				self.clear(e);
			});
		} else {
			this.clear(e, noPropagation);
		}

		return false;
		
	},
	clear: function(e, noPropagation) {

		if(this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) this.propagate("update", e, null, noPropagation); //Trigger update callback if the DOM position has changed
		if(!contains(this.element[0], this.currentItem[0])) { //Node was moved out of the current element
			this.propagate("remove", e, null, noPropagation);
			for (var i = this.containers.length - 1; i >= 0; i--){
				if(contains(this.containers[i].element[0], this.currentItem[0])) {
					this.containers[i].propagate("update", e, this, noPropagation);
					this.containers[i].propagate("receive", e, this, noPropagation);
				}
			};
		};
		
		//Post events to containers
		for (var i = this.containers.length - 1; i >= 0; i--){
			this.containers[i].propagate("deactivate", e, this, noPropagation);
			if(this.containers[i].containerCache.over) {
				this.containers[i].propagate("out", e, this);
				this.containers[i].containerCache.over = 0;
			}
		}
		
		this.dragging = false;
		if(this.cancelHelperRemoval) {
			this.propagate("stop", e, null, noPropagation);
			return false;
		}
		
		$(this.currentItem).css('visibility', '');
		if(this.placeholder) this.placeholder.remove();
		this.helper.remove(); this.helper = null;
		this.propagate("stop", e, null, noPropagation);
		
		return true;
		
	}
}));

$.extend($.ui.sortable, {
	getter: "serialize toArray",
	defaults: {
		helper: "clone",
		tolerance: "guess",
		distance: 1,
		delay: 0,
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		cancel: ":input",
		items: '> *',
		zIndex: 1000,
		dropOnEmpty: true,
		appendTo: "parent"
	}
});

/*
 * Sortable Extensions
 */

$.ui.plugin.add("sortable", "cursor", {
	start: function(e, ui) {
		var t = $('body');
		if (t.css("cursor")) ui.options._cursor = t.css("cursor");
		t.css("cursor", ui.options.cursor);
	},
	stop: function(e, ui) {
		if (ui.options._cursor) $('body').css("cursor", ui.options._cursor);
	}
});

$.ui.plugin.add("sortable", "zIndex", {
	start: function(e, ui) {
		var t = ui.helper;
		if(t.css("zIndex")) ui.options._zIndex = t.css("zIndex");
		t.css('zIndex', ui.options.zIndex);
	},
	stop: function(e, ui) {
		if(ui.options._zIndex) $(ui.helper).css('zIndex', ui.options._zIndex);
	}
});

$.ui.plugin.add("sortable", "opacity", {
	start: function(e, ui) {
		var t = ui.helper;
		if(t.css("opacity")) ui.options._opacity = t.css("opacity");
		t.css('opacity', ui.options.opacity);
	},
	stop: function(e, ui) {
		if(ui.options._opacity) $(ui.helper).css('opacity', ui.options._opacity);
	}
});

$.ui.plugin.add("sortable", "scroll", {
	start: function(e, ui) {
		var o = ui.options;
		var i = $(this).data("sortable");
	
		i.overflowY = function(el) {
			do { if(/auto|scroll/.test(el.css('overflow')) || (/auto|scroll/).test(el.css('overflow-y'))) return el; el = el.parent(); } while (el[0].parentNode);
			return $(document);
		}(i.currentItem);
		i.overflowX = function(el) {
			do { if(/auto|scroll/.test(el.css('overflow')) || (/auto|scroll/).test(el.css('overflow-x'))) return el; el = el.parent(); } while (el[0].parentNode);
			return $(document);
		}(i.currentItem);
		
		if(i.overflowY[0] != document && i.overflowY[0].tagName != 'HTML') i.overflowYOffset = i.overflowY.offset();
		if(i.overflowX[0] != document && i.overflowX[0].tagName != 'HTML') i.overflowXOffset = i.overflowX.offset();
		
	},
	sort: function(e, ui) {
		
		var o = ui.options;
		var i = $(this).data("sortable");
		
		if(i.overflowY[0] != document && i.overflowY[0].tagName != 'HTML') {
			if((i.overflowYOffset.top + i.overflowY[0].offsetHeight) - e.pageY < o.scrollSensitivity)
				i.overflowY[0].scrollTop = i.overflowY[0].scrollTop + o.scrollSpeed;
			if(e.pageY - i.overflowYOffset.top < o.scrollSensitivity)
				i.overflowY[0].scrollTop = i.overflowY[0].scrollTop - o.scrollSpeed;
		} else {
			if(e.pageY - $(document).scrollTop() < o.scrollSensitivity)
				$(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
			if($(window).height() - (e.pageY - $(document).scrollTop()) < o.scrollSensitivity)
				$(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
		}
		
		if(i.overflowX[0] != document && i.overflowX[0].tagName != 'HTML') {
			if((i.overflowXOffset.left + i.overflowX[0].offsetWidth) - e.pageX < o.scrollSensitivity)
				i.overflowX[0].scrollLeft = i.overflowX[0].scrollLeft + o.scrollSpeed;
			if(e.pageX - i.overflowXOffset.left < o.scrollSensitivity)
				i.overflowX[0].scrollLeft = i.overflowX[0].scrollLeft - o.scrollSpeed;
		} else {
			if(e.pageX - $(document).scrollLeft() < o.scrollSensitivity)
				$(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
			if($(window).width() - (e.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
				$(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
		}
		
	}
});

$.ui.plugin.add("sortable", "axis", {
	sort: function(e, ui) {
		
		var i = $(this).data("sortable");
		
		if(ui.options.axis == "y") i.position.left = i.originalPosition.left;
		if(ui.options.axis == "x") i.position.top = i.originalPosition.top;
		
	}
});

})(jQuery);
/*!
 * jQuery UI Tabs
 *
 * Copyright (c) 2007, 2008 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	ui.core.js
 */
(function($) {

$.widget("ui.tabs", {
	init: function() {
		this.options.event += '.tabs'; // namespace event
		
		// create tabs
		this.tabify(true);
	},
	setData: function(key, value) {
		if ((/^selected/).test(key))
			this.select(value);
		else {
			this.options[key] = value;
			this.tabify();
		}
	},
	length: function() {
		return this.$tabs.length;
	},
	tabId: function(a) {
		return a.title && a.title.replace(/\s/g, '_').replace(/[^A-Za-z0-9\-_:\.]/g, '')
			|| this.options.idPrefix + $.data(a);
	},
	ui: function(tab, panel) {
		return {
			options: this.options,
			tab: tab,
			panel: panel,
			index: this.$tabs.index(tab)
		};
	},
	tabify: function(init) {

		this.$lis = $('li:has(a[href])', this.element);
		this.$tabs = this.$lis.map(function() { return $('a', this)[0]; });
		this.$panels = $([]);

		var self = this, o = this.options;

		this.$tabs.each(function(i, a) {
			// inline tab
			if (a.hash && a.hash.replace('#', '')) // Safari 2 reports '#' for an empty hash
				self.$panels = self.$panels.add(a.hash);
			// remote tab
			else if ($(a).attr('href') != '#') { // prevent loading the page itself if href is just "#"
				$.data(a, 'href.tabs', a.href); // required for restore on destroy
				$.data(a, 'load.tabs', a.href); // mutable
				var id = self.tabId(a);
				a.href = '#' + id;
				var $panel = $('#' + id);
				if (!$panel.length) {
					$panel = $(o.panelTemplate).attr('id', id).addClass(o.panelClass)
						.insertAfter( self.$panels[i - 1] || self.element );
					$panel.data('destroy.tabs', true);
				}
				self.$panels = self.$panels.add( $panel );
			}
			// invalid tab href
			else
				o.disabled.push(i + 1);
		});

		if (init) {

			// attach necessary classes for styling if not present
			this.element.addClass(o.navClass);
			this.$panels.each(function() {
				var $this = $(this);
				$this.addClass(o.panelClass);
			});

			// Selected tab
			// use "selected" option or try to retrieve:
			// 1. from fragment identifier in url
			// 2. from cookie
			// 3. from selected class attribute on <li>
			if (o.selected === undefined) {
				if (location.hash) {
					this.$tabs.each(function(i, a) {
						if (a.hash == location.hash) {
							o.selected = i;
							// prevent page scroll to fragment
							if ($.browser.msie || $.browser.opera) { // && !o.remote
								var $toShow = $(location.hash), toShowId = $toShow.attr('id');
								$toShow.attr('id', '');
								setTimeout(function() {
									$toShow.attr('id', toShowId); // restore id
								}, 500);
							}
							scrollTo(0, 0);
							return false; // break
						}
					});
				}
				else if (o.cookie) {
					var index = parseInt($.cookie('ui-tabs' + $.data(self.element)),10);
					if (index && self.$tabs[index])
						o.selected = index;
				}
				else if (self.$lis.filter('.' + o.selectedClass).length)
					o.selected = self.$lis.index( self.$lis.filter('.' + o.selectedClass)[0] );
			}
			o.selected = o.selected === null || o.selected !== undefined ? o.selected : 0; // first tab selected by default

			// Take disabling tabs via class attribute from HTML
			// into account and update option properly.
			// A selected tab cannot become disabled.
			o.disabled = $.unique(o.disabled.concat(
				$.map(this.$lis.filter('.' + o.disabledClass),
					function(n, i) { return self.$lis.index(n); } )
			)).sort();
			if ($.inArray(o.selected, o.disabled) != -1)
				o.disabled.splice($.inArray(o.selected, o.disabled), 1);
			
			// highlight selected tab
			this.$panels.addClass(o.hideClass);
			this.$lis.removeClass(o.selectedClass);
			if (o.selected !== null) {
				this.$panels.eq(o.selected).show().removeClass(o.hideClass); // use show and remove class to show in any case no matter how it has been hidden before
				this.$lis.eq(o.selected).addClass(o.selectedClass);
				
				// seems to be expected behavior that the show callback is fired
				var onShow = function() {
					$(self.element).triggerHandler('tabsshow',
						[self.fakeEvent('tabsshow'), self.ui(self.$tabs[o.selected], self.$panels[o.selected])], o.show);
				}; 

				// load if remote tab
				if ($.data(this.$tabs[o.selected], 'load.tabs'))
					this.load(o.selected, onShow);
				// just trigger show event
				else
					onShow();
				
			}
			
			// clean up to avoid memory leaks in certain versions of IE 6
			$(window).bind('unload', function() {
				self.$tabs.unbind('.tabs');
				self.$lis = self.$tabs = self.$panels = null;
			});

		}

		// disable tabs
		for (var i = 0, li; li = this.$lis[i]; i++)
			$(li)[$.inArray(i, o.disabled) != -1 && !$(li).hasClass(o.selectedClass) ? 'addClass' : 'removeClass'](o.disabledClass);

		// reset cache if switching from cached to not cached
		if (o.cache === false)
			this.$tabs.removeData('cache.tabs');
		
		// set up animations
		var hideFx, showFx, baseFx = { 'min-width': 0, duration: 1 }, baseDuration = 'normal';
		if (o.fx && o.fx.constructor == Array)
			hideFx = o.fx[0] || baseFx, showFx = o.fx[1] || baseFx;
		else
			hideFx = showFx = o.fx || baseFx;

		// reset some styles to maintain print style sheets etc.
		var resetCSS = { display: '', overflow: '', height: '' };
		if (!$.browser.msie) // not in IE to prevent ClearType font issue
			resetCSS.opacity = '';

		// Hide a tab, animation prevents browser scrolling to fragment,
		// $show is optional.
		function hideTab(clicked, $hide, $show) {
			$hide.animate(hideFx, hideFx.duration || baseDuration, function() { //
				$hide.addClass(o.hideClass).css(resetCSS); // maintain flexible height and accessibility in print etc.
				if ($.browser.msie && hideFx.opacity)
					$hide[0].style.filter = '';
				if ($show)
					showTab(clicked, $show, $hide);
			});
		}

		// Show a tab, animation prevents browser scrolling to fragment,
		// $hide is optional.
		function showTab(clicked, $show, $hide) {
			if (showFx === baseFx)
				$show.css('display', 'block'); // prevent occasionally occuring flicker in Firefox cause by gap between showing and hiding the tab panels
			$show.animate(showFx, showFx.duration || baseDuration, function() {
				$show.removeClass(o.hideClass).css(resetCSS); // maintain flexible height and accessibility in print etc.
				if ($.browser.msie && showFx.opacity)
					$show[0].style.filter = '';

				// callback
				$(self.element).triggerHandler('tabsshow',
					[self.fakeEvent('tabsshow'), self.ui(clicked, $show[0])], o.show);

			});
		}

		// switch a tab
		function switchTab(clicked, $li, $hide, $show) {
			/*if (o.bookmarkable && trueClick) { // add to history only if true click occured, not a triggered click
				$.ajaxHistory.update(clicked.hash);
			}*/
			$li.addClass(o.selectedClass)
				.siblings().removeClass(o.selectedClass);
			hideTab(clicked, $hide, $show);
		}

		// attach tab event handler, unbind to avoid duplicates from former tabifying...
		this.$tabs.unbind('.tabs').bind(o.event, function() {

			//var trueClick = e.clientX; // add to history only if true click occured, not a triggered click
			var $li = $(this).parents('li:eq(0)'),
				$hide = self.$panels.filter(':visible'),
				$show = $(this.hash);

			// If tab is already selected and not unselectable or tab disabled or 
			// or is already loading or click callback returns false stop here.
			// Check if click handler returns false last so that it is not executed
			// for a disabled or loading tab!
			if (($li.hasClass(o.selectedClass) && !o.unselect)
				|| $li.hasClass(o.disabledClass) 
				|| $(this).hasClass(o.loadingClass)
				|| $(self.element).triggerHandler('tabsselect', [self.fakeEvent('tabsselect'), self.ui(this, $show[0])], o.select) === false
				) {
				this.blur();
				return false;
			}

			self.options.selected = self.$tabs.index(this);

			// if tab may be closed
			if (o.unselect) {
				if ($li.hasClass(o.selectedClass)) {
					self.options.selected = null;
					$li.removeClass(o.selectedClass);
					self.$panels.stop();
					hideTab(this, $hide);
					this.blur();
					return false;
				} else if (!$hide.length) {
					self.$panels.stop();
					var a = this;
					self.load(self.$tabs.index(this), function() {
						$li.addClass(o.selectedClass).addClass(o.unselectClass);
						showTab(a, $show);
					});
					this.blur();
					return false;
				}
			}

			if (o.cookie)
				$.cookie('ui-tabs' + $.data(self.element), self.options.selected, o.cookie);

			// stop possibly running animations
			self.$panels.stop();

			// show new tab
			if ($show.length) {

				// prevent scrollbar scrolling to 0 and than back in IE7, happens only if bookmarking/history is enabled
				/*if ($.browser.msie && o.bookmarkable) {
					var showId = this.hash.replace('#', '');
					$show.attr('id', '');
					setTimeout(function() {
						$show.attr('id', showId); // restore id
					}, 0);
				}*/

				var a = this;
				self.load(self.$tabs.index(this), $hide.length ? 
					function() {
						switchTab(a, $li, $hide, $show);
					} :
					function() {
						$li.addClass(o.selectedClass);
						showTab(a, $show);
					}
				);

				// Set scrollbar to saved position - need to use timeout with 0 to prevent browser scroll to target of hash
				/*var scrollX = window.pageXOffset || document.documentElement && document.documentElement.scrollLeft || document.body.scrollLeft || 0;
				var scrollY = window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop || 0;
				setTimeout(function() {
					scrollTo(scrollX, scrollY);
				}, 0);*/

			} else
				throw 'jQuery UI Tabs: Mismatching fragment identifier.';

			// Prevent IE from keeping other link focussed when using the back button
			// and remove dotted border from clicked link. This is controlled in modern
			// browsers via CSS, also blur removes focus from address bar in Firefox
			// which can become a usability and annoying problem with tabsRotate.
			if ($.browser.msie)
				this.blur();

			//return o.bookmarkable && !!trueClick; // convert trueClick == undefined to Boolean required in IE
			return false;

		});

		// disable click if event is configured to something else
		if (!(/^click/).test(o.event))
			this.$tabs.bind('click.tabs', function() { return false; });

	},
	add: function(url, label, index) {
		if (index == undefined) 
			index = this.$tabs.length; // append by default

		var o = this.options;
		var $li = $(o.tabTemplate.replace(/#\{href\}/g, url).replace(/#\{label\}/g, label));
		$li.data('destroy.tabs', true);

		var id = url.indexOf('#') == 0 ? url.replace('#', '') : this.tabId( $('a:first-child', $li)[0] );

		// try to find an existing element before creating a new one
		var $panel = $('#' + id);
		if (!$panel.length) {
			$panel = $(o.panelTemplate).attr('id', id)
				.addClass(o.hideClass)
				.data('destroy.tabs', true);
		}
		$panel.addClass(o.panelClass);
		if (index >= this.$lis.length) {
			$li.appendTo(this.element);
			$panel.appendTo(this.element[0].parentNode);
		} else {
			$li.insertBefore(this.$lis[index]);
			$panel.insertBefore(this.$panels[index]);
		}
		
		o.disabled = $.map(o.disabled,
			function(n, i) { return n >= index ? ++n : n });
			
		this.tabify();

		if (this.$tabs.length == 1) {
			$li.addClass(o.selectedClass);
			$panel.removeClass(o.hideClass);
			var href = $.data(this.$tabs[0], 'load.tabs');
			if (href)
				this.load(index, href);
		}

		// callback
		this.element.triggerHandler('tabsadd',
			[this.fakeEvent('tabsadd'), this.ui(this.$tabs[index], this.$panels[index])], o.add
		);
	},
	remove: function(index) {
		var o = this.options, $li = this.$lis.eq(index).remove(),
			$panel = this.$panels.eq(index).remove();

		// If selected tab was removed focus tab to the right or
		// in case the last tab was removed the tab to the left.
		if ($li.hasClass(o.selectedClass) && this.$tabs.length > 1)
			this.select(index + (index + 1 < this.$tabs.length ? 1 : -1));

		o.disabled = $.map($.grep(o.disabled, function(n, i) { return n != index; }),
			function(n, i) { return n >= index ? --n : n });

		this.tabify();

		// callback
		this.element.triggerHandler('tabsremove',
			[this.fakeEvent('tabsremove'), this.ui($li.find('a')[0], $panel[0])], o.remove
		);
	},
	enable: function(index) {
		var o = this.options;
		if ($.inArray(index, o.disabled) == -1)
			return;
			
		var $li = this.$lis.eq(index).removeClass(o.disabledClass);
		if ($.browser.safari) { // fix disappearing tab (that used opacity indicating disabling) after enabling in Safari 2...
			$li.css('display', 'inline-block');
			setTimeout(function() {
				$li.css('display', 'block');
			}, 0);
		}

		o.disabled = $.grep(o.disabled, function(n, i) { return n != index; });

		// callback
		this.element.triggerHandler('tabsenable',
			[this.fakeEvent('tabsenable'), this.ui(this.$tabs[index], this.$panels[index])], o.enable
		);

	},
	disable: function(index) {
		var self = this, o = this.options;
		if (index != o.selected) { // cannot disable already selected tab
			this.$lis.eq(index).addClass(o.disabledClass);

			o.disabled.push(index);
			o.disabled.sort();

			// callback
			this.element.triggerHandler('tabsdisable',
				[this.fakeEvent('tabsdisable'), this.ui(this.$tabs[index], this.$panels[index])], o.disable
			);
		}
	},
	select: function(index) {
		if (typeof index == 'string')
			index = this.$tabs.index( this.$tabs.filter('[href$=' + index + ']')[0] );
		this.$tabs.eq(index).trigger(this.options.event);
	},
	load: function(index, callback) { // callback is for internal usage only
		
		var self = this, o = this.options, $a = this.$tabs.eq(index), a = $a[0],
				bypassCache = callback == undefined || callback === false, url = $a.data('load.tabs');

		callback = callback || function() {};
		
		// no remote or from cache - just finish with callback
		if (!url || !bypassCache && $.data(a, 'cache.tabs')) {
			callback();
			return;
		}

		// load remote from here on
		
		var inner = function(parent) {
			var $parent = $(parent), $inner = $parent.find('*:last');
			return $inner.length && $inner.is(':not(img)') && $inner || $parent;
		};
		var cleanup = function() {
			self.$tabs.filter('.' + o.loadingClass).removeClass(o.loadingClass)
						.each(function() {
							if (o.spinner)
								inner(this).parent().html(inner(this).data('label.tabs'));
						});
			self.xhr = null;
		};
		
		if (o.spinner) {
			var label = inner(a).html();
			inner(a).wrapInner('<em></em>')
				.find('em').data('label.tabs', label).html(o.spinner);
		}

		var ajaxOptions = $.extend({}, o.ajaxOptions, {
			url: url,
			success: function(r, s) {
				$(a.hash).html(r);
				cleanup();
				
				if (o.cache)
					$.data(a, 'cache.tabs', true); // if loaded once do not load them again

				// callbacks
				$(self.element).triggerHandler('tabsload',
					[self.fakeEvent('tabsload'), self.ui(self.$tabs[index], self.$panels[index])], o.load
				);
				o.ajaxOptions.success && o.ajaxOptions.success(r, s);
				
				// This callback is required because the switch has to take
				// place after loading has completed. Call last in order to 
				// fire load before show callback...
				callback();
			}
		});
		if (this.xhr) {
			// terminate pending requests from other tabs and restore tab label
			this.xhr.abort();
			cleanup();
		}
		$a.addClass(o.loadingClass);
		setTimeout(function() { // timeout is again required in IE, "wait" for id being restored
			self.xhr = $.ajax(ajaxOptions);
		}, 0);

	},
	url: function(index, url) {
		this.$tabs.eq(index).removeData('cache.tabs').data('load.tabs', url);
	},
	destroy: function() {
		var o = this.options;
		this.element.unbind('.tabs')
			.removeClass(o.navClass).removeData('tabs');
		this.$tabs.each(function() {
			var href = $.data(this, 'href.tabs');
			if (href)
				this.href = href;
			var $this = $(this).unbind('.tabs');
			$.each(['href', 'load', 'cache'], function(i, prefix) {
				$this.removeData(prefix + '.tabs');
			});
		});
		this.$lis.add(this.$panels).each(function() {
			if ($.data(this, 'destroy.tabs'))
				$(this).remove();
			else
				$(this).removeClass([o.selectedClass, o.unselectClass,
					o.disabledClass, o.panelClass, o.hideClass].join(' '));
		});
	},
	fakeEvent: function(type) {
		return $.event.fix({
			type: type,
			target: this.element[0]
		});
	}
});

$.ui.tabs.defaults = {
	// basic setup
	unselect: false,
	event: 'click',
	disabled: [],
	cookie: null, // e.g. { expires: 7, path: '/', domain: 'jquery.com', secure: true }
	// TODO history: false,

	// Ajax
	spinner: 'Loading&#8230;',
	cache: false,
	idPrefix: 'ui-tabs-',
	ajaxOptions: {},

	// animations
	fx: null, // e.g. { height: 'toggle', opacity: 'toggle', duration: 200 }

	// templates
	tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>',
	panelTemplate: '<div></div>',

	// CSS classes
	navClass: 'ui-tabs-nav',
	selectedClass: 'ui-tabs-selected',
	unselectClass: 'ui-tabs-unselect',
	disabledClass: 'ui-tabs-disabled',
	panelClass: 'ui-tabs-panel',
	hideClass: 'ui-tabs-hide',
	loadingClass: 'ui-tabs-loading'
};

$.ui.tabs.getter = "length";

/*
 * Tabs Extensions
 */

/*
 * Rotate
 */
$.extend($.ui.tabs.prototype, {
	rotation: null,
	rotate: function(ms, continuing) {
		
		continuing = continuing || false;
		
		var self = this, t = this.options.selected;
		
		function start() {
			self.rotation = setInterval(function() {
				t = ++t < self.$tabs.length ? t : 0;
				self.select(t);
			}, ms); 
		}
		
		function stop(e) {
			if (!e || e.clientX) { // only in case of a true click
				clearInterval(self.rotation);
			}
		}
		
		// start interval
		if (ms) {
			start();
			if (!continuing)
				this.$tabs.bind(this.options.event, stop);
			else
				this.$tabs.bind(this.options.event, function() {
					stop();
					t = self.options.selected;
					start();
				});
		}
		// stop interval
		else {
			stop();
			this.$tabs.unbind(this.options.event, stop);
		}
	}
});

})(jQuery);
/*!
 * Copyright (c) 2006/2007 Sam Collett (http://www.texotela.co.uk)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Version 1.0
 * Demo: http://www.texotela.co.uk/code/jquery/numeric/
 */
 
/*
 * Allows only valid characters to be entered into input boxes.
 * Note: does not validate that the final text is a valid number
 * (that could be done by another script, or server-side)
 *
 * @name     numeric
 * @param    decimal      Decimal separator (e.g. '.' or ',' - default is '.')
 * @param    callback     A function that runs if the number is not valid (fires onblur)
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @example  $(".numeric").numeric();
 * @example  $(".numeric").numeric(",");
 * @example  $(".numeric").numeric(null, callback);
 *
 */
jQuery.fn.numeric = function(decimal, callback)
{
	decimal = decimal || ".";
	callback = typeof callback == "function" ? callback : function(){};
	this.keypress(
		function(e)
		{
			var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
			// allow enter/return key (only when in an input box)
			if(key == 13 && this.nodeName.toLowerCase() == "input")
			{
				return true;
			}
			else if(key == 13)
			{
				return false;
			}
			var allow = false;
			// allow Ctrl+A
			if((e.ctrlKey && key == 97 /* firefox */) || (e.ctrlKey && key == 65) /* opera */) return true;
			// allow Ctrl+X (cut)
			if((e.ctrlKey && key == 120 /* firefox */) || (e.ctrlKey && key == 88) /* opera */) return true;
			// allow Ctrl+C (copy)
			if((e.ctrlKey && key == 99 /* firefox */) || (e.ctrlKey && key == 67) /* opera */) return true;
			// allow Ctrl+Z (undo)
			if((e.ctrlKey && key == 122 /* firefox */) || (e.ctrlKey && key == 90) /* opera */) return true;
			// allow or deny Ctrl+V (paste), Shift+Ins
			if((e.ctrlKey && key == 118 /* firefox */) || (e.ctrlKey && key == 86) /* opera */
			|| (e.shiftKey && key == 45)) return true;
			// if a number was not pressed
			if(key < 48 || key > 57)
			{
				/* '-' only allowed at start */
				if(key == 45 && this.value.length == 0) return true;
				/* only one decimal separator allowed */
				if(key == decimal.charCodeAt(0) && this.value.indexOf(decimal) != -1)
				{
					allow = false;
				}
				// check for other keys that have special purposes
				if(
					key != 8 /* backspace */ &&
					key != 9 /* tab */ &&
					key != 13 /* enter */ &&
					key != 35 /* end */ &&
					key != 36 /* home */ &&
					key != 37 /* left */ &&
					key != 39 /* right */ &&
					key != 46 /* del */
				)
				{
					allow = false;
				}
				else
				{
					// for detecting special keys (listed above)
					// IE does not support 'charCode' and ignores them in keypress anyway
					if(typeof e.charCode != "undefined")
					{
						// special keys have 'keyCode' and 'which' the same (e.g. backspace)
						if(e.keyCode == e.which && e.which != 0)
						{
							allow = true;
						}
						// or keyCode != 0 and 'charCode'/'which' = 0
						else if(e.keyCode != 0 && e.charCode == 0 && e.which == 0)
						{
							allow = true;
						}
					}
				}
				// if key pressed is the decimal and it is not already in the field
				if(key == decimal.charCodeAt(0) && this.value.indexOf(decimal) == -1)
				{
					allow = true;
				}
			}
			else
			{
				allow = true;
			}
			return allow;
		}
	)
	.blur(
		function()
		{
			var val = jQuery(this).val();
			if(val != "")
			{
				var re = new RegExp("^\\d+$|\\d*" + decimal + "\\d+");
				if(!re.exec(val))
				{
					callback.apply(this);
				}
			}
		}
	);
	return this;
}
/* SpinButton control
 *
 * Adds bells and whistles to any ordinary textbox to
 * make it look and feel like a SpinButton Control.
 *
 * Originally written by George Adamson, Software Unity (george.jquery@softwareunity.com) August 2006.
 * - Added min/max options
 * - Added step size option
 * - Added bigStep (page up/down) option
 *
 * Modifications made by Mark Gibson, (mgibson@designlinks.net) September 2006:
 * - Converted to jQuery plugin
 * - Allow limited or unlimited min/max values
 * - Allow custom class names, and add class to input element
 * - Removed global vars
 * - Reset (to original or through config) when invalid value entered
 * - Repeat whilst holding mouse button down (with initial pause, like keyboard repeat)
 * - Support mouse wheel in Firefox
 * - Fix double click in IE
 * - Refactored some code and renamed some vars
 *
 * Tested in IE6, Opera9, Firefox 1.5
 * v1.0  11 Aug 2006 - George Adamson	- First release
 * v1.1     Aug 2006 - George Adamson	- Minor enhancements
 * v1.2  27 Sep 2006 - Mark Gibson		- Major enhancements
 * v1.3a 28 Sep 2006 - George Adamson	- Minor enhancements
 
 Sample usage:
 
	// Create group of settings to initialise spinbutton(s). (Optional)
	var myOptions = {
					min: 0,						// Set lower limit.
					max: 100,					// Set upper limit.
					step: 1,					// Set increment size.
					spinClass: mySpinBtnClass,	// CSS class to style the spinbutton. (Class also specifies url of the up/down button image.)
					upClass: mySpinUpClass,		// CSS class for style when mouse over up button.
					downClass: mySpinDnClass	// CSS class for style when mouse over down button.
					}
 
	$(document).ready(function(){

		// Initialise INPUT element(s) as SpinButtons: (passing options if desired)
		$("#myInputElement").SpinButton(myOptions);

	});
 
 */
$.fn.SpinButton = function(cfg){
	return this.each(function(){

		// Apply specified options or defaults:
		// (Ought to refactor this some day to use $.extend() instead)
		this.spinCfg = {
			//min: cfg && cfg.min ? Number(cfg.min) : null,
			//max: cfg && cfg.max ? Number(cfg.max) : null,
			min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null,	// Fixes bug with min:0
			max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
			step: cfg && cfg.step ? Number(cfg.step) : 1,
			page: cfg && cfg.page ? Number(cfg.page) : 10,
			upClass: cfg && cfg.upClass ? cfg.upClass : 'up',
			downClass: cfg && cfg.downClass ? cfg.downClass : 'down',
			reset: cfg && cfg.reset ? cfg.reset : this.value,
			delay: cfg && cfg.delay ? Number(cfg.delay) : 500,
			interval: cfg && cfg.interval ? Number(cfg.interval) : 100,
			_btn_width: 20,
			_btn_height: 12,
			_direction: null,
			_delay: null,
			_repeat: null,
			asint: cfg && cfg.asint != undefined ? cfg.asint : true
		};

		this.adjustValue = function(i){
			var v = (isNaN(this.value) ? this.spinCfg.reset : Number(this.value)) + Number(i);
			if (this.spinCfg.min !== null) v = Math.max(v, this.spinCfg.min);
			if (this.spinCfg.max !== null) v = Math.min(v, this.spinCfg.max);
			if (!this.spinCfg.asint) v = v.toFixed(4);
			var ischanged = this.value != v; 
			this.value = v;
			if (ischanged) $(this).change();
		};
		
		$(this)
		.addClass(cfg && cfg.spinClass ? cfg.spinClass : 'spin-button')
		
		.mousemove(function(e){
			// Determine which button mouse is over, or not (spin direction):
			var x = e.pageX || e.x;
			var y = e.pageY || e.y;
      var el = e.target || e.srcElement;

			var direction = 
				(x > coord(el,'offsetLeft') + el.offsetWidth - this.spinCfg._btn_width)
				? ((y < coord(el,'offsetTop') + this.spinCfg._btn_height) ? 1 : -1) : 0;
			
			if (direction !== this.spinCfg._direction) {
				// Style up/down buttons:
				switch(direction){
					case 1: // Up arrow:
						$(this).removeClass(this.spinCfg.downClass).addClass(this.spinCfg.upClass);
						break;
					case -1: // Down arrow:
						$(this).removeClass(this.spinCfg.upClass).addClass(this.spinCfg.downClass);
						break;
					default: // Mouse is elsewhere in the textbox
						$(this).removeClass(this.spinCfg.upClass).removeClass(this.spinCfg.downClass);
				}
				
				// Set spin direction:
				this.spinCfg._direction = direction;
			}
		})
		
		.mouseout(function(){
			// Reset up/down buttons to their normal appearance when mouse moves away:
			$(this).removeClass(this.spinCfg.upClass).removeClass(this.spinCfg.downClass);
			this.spinCfg._direction = null;
		})
		
		.mousedown(function(e){
			if (this.spinCfg._direction != 0) {
				// Respond to click on one of the buttons:
				var self = this;
				var adjust = function() {
					self.adjustValue(self.spinCfg._direction * self.spinCfg.step);
				};
			
				adjust();
				
				// Initial delay before repeating adjustment
				self.spinCfg._delay = window.setTimeout(function() {
					adjust();
					// Repeat adjust at regular intervals
					self.spinCfg._repeat = window.setInterval(adjust, self.spinCfg.interval);
				}, self.spinCfg.delay);
			}
		})
		
		.mouseup(function(e){
			// Cancel repeating adjustment
			window.clearInterval(this.spinCfg._repeat);
			window.clearTimeout(this.spinCfg._delay);
		})
		
		.dblclick(function(e) {
			if ($.browser.msie)
				this.adjustValue(this.spinCfg._direction * this.spinCfg.step);
		})
		
		.keydown(function(e){
			// Respond to up/down arrow keys.
			switch(e.keyCode){
				case 38: this.adjustValue(this.spinCfg.step);  break; // Up
				case 40: this.adjustValue(-this.spinCfg.step); break; // Down
				case 33: this.adjustValue(this.spinCfg.page);  break; // PageUp
				case 34: this.adjustValue(-this.spinCfg.page); break; // PageDown
			}
		})

		.bind("mousewheel", function(e){
			// Respond to mouse wheel in IE. (It returns up/dn motion in multiples of 120)
			if (e.wheelDelta >= 120)
				this.adjustValue(this.spinCfg.step);
			else if (e.wheelDelta <= -120)
				this.adjustValue(-this.spinCfg.step);
			
			e.preventDefault();
		})
		
		.change(function(e){
			this.adjustValue(0);
		});
		
		if (this.addEventListener) {
			// Respond to mouse wheel in Firefox
			this.addEventListener('DOMMouseScroll', function(e) {
				if (e.detail > 0)
					this.adjustValue(-this.spinCfg.step);
				else if (e.detail < 0)
					this.adjustValue(this.spinCfg.step);
				
				e.preventDefault();
			}, false);
		}
	});
	
	function coord(el,prop) {
		var c = el[prop], b = document.body;
		
		while ((el = el.offsetParent) && (el != b)) {
			if ((!$.browser.msie || (jQuery.browser.msie && parseFloat(jQuery.browser.version) > 7) ) || (el.currentStyle.position != 'relative'))
				c += el[prop];
		}
		
		return c;
	}
};
/*! 
 * jQuery Access Keys Plugin Beta 1 - A jQuery plugin to automatically assign access keys
 * Author: Jamie Thompson (jamie_at_themagictorch_d0t_org) 
 * Website: http://jamazon.co.uk
 * 
 * Copyright (c) 2008 Jamie Thompson
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

$.fn.accessKeys = function(){
	
	var keys = new Array(0);
	
	var find = function(ary, element){
	    for(var i=0; i<ary.length; i++){
	        if(ary[i] == element){
	            return true;
	        };
	    };
	    return false;
	};
	
	$(this).each(function(i){
		
		for (var j=0; j < $(this).text().length; j++){
			
			var chr = $(this).text().charAt(j);
					
			if(!find(keys,chr.toLowerCase()) && chr.match(/[A-Za-z_0-9]/)){
				var regexp = new RegExp(chr,"i");
				$(this).html( $(this).html().replace(regexp,'<u>'+chr+'</u>') );
				$(this).attr( 'accesskey', chr.toLowerCase() );
				keys[i] = chr.toLowerCase();
				break;
			};
			
		};
	});
	
};

/*!
 * jQuery UI Effects 1.5.2
 *
 * Copyright (c) 2008 Aaron Eisenberger (aaronchi@gmail.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://docs.jquery.com/UI/Effects/
 */
;(function($) {

$.effects = $.effects || {}; //Add the 'effects' scope

$.extend($.effects, {
	save: function(el, set) {
		for(var i=0;i<set.length;i++) {
			if(set[i] !== null) $.data(el[0], "ec.storage."+set[i], el[0].style[set[i]]);
		}
	},
	restore: function(el, set) {
		for(var i=0;i<set.length;i++) {
			if(set[i] !== null) el.css(set[i], $.data(el[0], "ec.storage."+set[i]));
		}
	},
	setMode: function(el, mode) {
		if (mode == 'toggle') mode = el.is(':hidden') ? 'show' : 'hide'; // Set for toggle
		return mode;
	},
	getBaseline: function(origin, original) { // Translates a [top,left] array into a baseline value
		// this should be a little more flexible in the future to handle a string & hash
		var y, x;
		switch (origin[0]) {
			case 'top': y = 0; break;
			case 'middle': y = 0.5; break;
			case 'bottom': y = 1; break;
			default: y = origin[0] / original.height;
		};
		switch (origin[1]) {
			case 'left': x = 0; break;
			case 'center': x = 0.5; break;
			case 'right': x = 1; break;
			default: x = origin[1] / original.width;
		};
		return {x: x, y: y};
	},
	createWrapper: function(el) {
		if (el.parent().attr('id') == 'fxWrapper')
			return el;
		var props = {width: el.outerWidth({margin:true}), height: el.outerHeight({margin:true}), 'float': el.css('float')};
		el.wrap('<div id="fxWrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');
		var wrapper = el.parent();
		if (el.css('position') == 'static'){
			wrapper.css({position: 'relative'});
			el.css({position: 'relative'});
		} else {
			var top = el.css('top'); if(isNaN(parseInt(top))) top = 'auto';
			var left = el.css('left'); if(isNaN(parseInt(left))) left = 'auto';
			wrapper.css({ position: el.css('position'), top: top, left: left, zIndex: el.css('z-index') }).show();
			el.css({position: 'relative', top:0, left:0});
		}
		wrapper.css(props);
		return wrapper;
	},
	removeWrapper: function(el) {
		if (el.parent().attr('id') == 'fxWrapper')
			return el.parent().replaceWith(el);
		return el;
	},
	setTransition: function(el, list, factor, val) {
		val = val || {};
		$.each(list,function(i, x){
			unit = el.cssUnit(x);
			if (unit[0] > 0) val[x] = unit[0] * factor + unit[1];
		});
		return val;
	},
	animateClass: function(value, duration, easing, callback) {

		var cb = (typeof easing == "function" ? easing : (callback ? callback : null));
		var ea = (typeof easing == "object" ? easing : null);

		return this.each(function() {

			var offset = {}; var that = $(this); var oldStyleAttr = that.attr("style") || '';
			if(typeof oldStyleAttr == 'object') oldStyleAttr = oldStyleAttr["cssText"]; /* Stupidly in IE, style is a object.. */
			if(value.toggle) { that.hasClass(value.toggle) ? value.remove = value.toggle : value.add = value.toggle; }

			//Let's get a style offset
			var oldStyle = $.extend({}, (document.defaultView ? document.defaultView.getComputedStyle(this,null) : this.currentStyle));
			if(value.add) that.addClass(value.add); if(value.remove) that.removeClass(value.remove);
			var newStyle = $.extend({}, (document.defaultView ? document.defaultView.getComputedStyle(this,null) : this.currentStyle));
			if(value.add) that.removeClass(value.add); if(value.remove) that.addClass(value.remove);

			// The main function to form the object for animation
			for(var n in newStyle) {
				if( typeof newStyle[n] != "function" && newStyle[n] /* No functions and null properties */
				&& n.indexOf("Moz") == -1 && n.indexOf("length") == -1 /* No mozilla spezific render properties. */
				&& newStyle[n] != oldStyle[n] /* Only values that have changed are used for the animation */
				&& (n.match(/color/i) || (!n.match(/color/i) && !isNaN(parseInt(newStyle[n],10)))) /* Only things that can be parsed to integers or colors */
				&& (oldStyle.position != "static" || (oldStyle.position == "static" && !n.match(/left|top|bottom|right/))) /* No need for positions when dealing with static positions */
				) offset[n] = newStyle[n];
			}

			that.animate(offset, duration, ea, function() { // Animate the newly constructed offset object
				// Change style attribute back to original. For stupid IE, we need to clear the damn object.
				if(typeof $(this).attr("style") == 'object') { $(this).attr("style")["cssText"] = ""; $(this).attr("style")["cssText"] = oldStyleAttr; } else $(this).attr("style", oldStyleAttr);
				if(value.add) $(this).addClass(value.add); if(value.remove) $(this).removeClass(value.remove);
				if(cb) cb.apply(this, arguments);
			});

		});
	}
});

//Extend the methods of jQuery
$.fn.extend({
	//Save old methods
	_show: $.fn.show,
	_hide: $.fn.hide,
	__toggle: $.fn.toggle,
	_addClass: $.fn.addClass,
	_removeClass: $.fn.removeClass,
	_toggleClass: $.fn.toggleClass,
	// New ec methods
	effect: function(fx,o,speed,callback) {
		return $.effects[fx] ? $.effects[fx].call(this, {method: fx, options: o || {}, duration: speed, callback: callback }) : null;
	},
	show: function() {
		if(!arguments[0] || (arguments[0].constructor == Number || /(slow|normal|fast)/.test(arguments[0])))
			return this._show.apply(this, arguments);
		else {
			var o = arguments[1] || {}; o['mode'] = 'show';
			return this.effect.apply(this, [arguments[0], o, arguments[2] || o.duration, arguments[3] || o.callback]);
		}
	},
	hide: function() {
		if(!arguments[0] || (arguments[0].constructor == Number || /(slow|normal|fast)/.test(arguments[0])))
			return this._hide.apply(this, arguments);
		else {
			var o = arguments[1] || {}; o['mode'] = 'hide';
			return this.effect.apply(this, [arguments[0], o, arguments[2] || o.duration, arguments[3] || o.callback]);
		}
	},
	toggle: function(){
		if(!arguments[0] || (arguments[0].constructor == Number || /(slow|normal|fast)/.test(arguments[0])) || (arguments[0].constructor == Function))
			return this.__toggle.apply(this, arguments);
		else {
			var o = arguments[1] || {}; o['mode'] = 'toggle';
			return this.effect.apply(this, [arguments[0], o, arguments[2] || o.duration, arguments[3] || o.callback]);
		}
	},
	addClass: function(classNames,speed,easing,callback) {
		return speed ? $.effects.animateClass.apply(this, [{ add: classNames },speed,easing,callback]) : this._addClass(classNames);
	},
	removeClass: function(classNames,speed,easing,callback) {
		return speed ? $.effects.animateClass.apply(this, [{ remove: classNames },speed,easing,callback]) : this._removeClass(classNames);
	},
	toggleClass: function(classNames,speed,easing,callback) {
		return speed ? $.effects.animateClass.apply(this, [{ toggle: classNames },speed,easing,callback]) : this._toggleClass(classNames);
	},
	morph: function(remove,add,speed,easing,callback) {
		return $.effects.animateClass.apply(this, [{ add: add, remove: remove },speed,easing,callback]);
	},
	switchClass: function() {
		return this.morph.apply(this, arguments);
	},
	// helper functions
	cssUnit: function(key) {
		var style = this.css(key), val = [];
		$.each( ['em','px','%','pt'], function(i, unit){
			if(style.indexOf(unit) > 0)
				val = [parseFloat(style), unit];
		});
		return val;
	}
});

/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

// We override the animation for all of these color styles
jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
				if ( fx.state == 0 ) {
						fx.start = getColor( fx.elem, attr );
						fx.end = getRGB( fx.end );
				}

				fx.elem.style[attr] = "rgb(" + [
						Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
						Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
						Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
				].join(",") + ")";
		}
});

// Color Conversion functions from highlightFade
// By Blair Mitchelmore
// http://jquery.offput.ca/highlightFade/

// Parse strings looking for color tuples [255,255,255]
function getRGB(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && color.constructor == Array && color.length == 3 )
				return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
				return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
				return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
				return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
				return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Look for rgba(0, 0, 0, 0) == transparent in Safari 3
		if (result = /rgba\(0, 0, 0, 0\)/.exec(color))
				return colors['transparent']

		// Otherwise, we're most likely dealing with a named color
		return colors[jQuery.trim(color).toLowerCase()];
}

function getColor(elem, attr) {
		var color;

		do {
				color = jQuery.curCSS(elem, attr);

				// Keep going until we find an element that has color, or we hit the body
				if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
						break;

				attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
};

// Some named colors to work with
// From Interface by Stefan Petre
// http://interface.eyecon.ro/

var colors = {
	aqua:[0,255,255],
	azure:[240,255,255],
	beige:[245,245,220],
	black:[0,0,0],
	blue:[0,0,255],
	brown:[165,42,42],
	cyan:[0,255,255],
	darkblue:[0,0,139],
	darkcyan:[0,139,139],
	darkgrey:[169,169,169],
	darkgreen:[0,100,0],
	darkkhaki:[189,183,107],
	darkmagenta:[139,0,139],
	darkolivegreen:[85,107,47],
	darkorange:[255,140,0],
	darkorchid:[153,50,204],
	darkred:[139,0,0],
	darksalmon:[233,150,122],
	darkviolet:[148,0,211],
	fuchsia:[255,0,255],
	gold:[255,215,0],
	green:[0,128,0],
	indigo:[75,0,130],
	khaki:[240,230,140],
	lightblue:[173,216,230],
	lightcyan:[224,255,255],
	lightgreen:[144,238,144],
	lightgrey:[211,211,211],
	lightpink:[255,182,193],
	lightyellow:[255,255,224],
	lime:[0,255,0],
	magenta:[255,0,255],
	maroon:[128,0,0],
	navy:[0,0,128],
	olive:[128,128,0],
	orange:[255,165,0],
	pink:[255,192,203],
	purple:[128,0,128],
	violet:[128,0,128],
	red:[255,0,0],
	silver:[192,192,192],
	white:[255,255,255],
	yellow:[255,255,0],
	transparent: [255,255,255]
};
	
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

})(jQuery);
/*!
 * jQuery UI Effects Explode
 *
 * Copyright (c) 2008 Paul Bakaus (ui.jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://docs.jquery.com/UI/Effects/Explode
 *
 * Depends:
 *	effects.core.js
 */
(function($) {

$.effects.explode = function(o) {

	return this.queue(function() {

	var rows = o.options.pieces ? Math.round(Math.sqrt(o.options.pieces)) : 3;
	var cells = o.options.pieces ? Math.round(Math.sqrt(o.options.pieces)) : 3;
	
	o.options.mode = o.options.mode == 'toggle' ? ($(this).is(':visible') ? 'hide' : 'show') : o.options.mode;
	var el = $(this).show().css('visibility', 'hidden');
	var offset = el.offset();
	
	//Substract the margins - not fixing the problem yet.
	offset.top -= parseInt(el.css("marginTop")) || 0;
	offset.left -= parseInt(el.css("marginLeft")) || 0;
	
	var width = el.outerWidth(true);
	var height = el.outerHeight(true);

	for(var i=0;i<rows;i++) { // =
		for(var j=0;j<cells;j++) { // ||
			el
				.clone()
				.appendTo('body')
				.wrap('<div></div>')
				.css({
					position: 'absolute',
					visibility: 'visible',
					left: -j*(width/cells),
					top: -i*(height/rows)
				})
				.parent()
				.addClass('effects-explode')
				.css({
					position: 'absolute',
					overflow: 'hidden',
					width: width/cells,
					height: height/rows,
					left: offset.left + j*(width/cells) + (o.options.mode == 'show' ? (j-Math.floor(cells/2))*(width/cells) : 0),
					top: offset.top + i*(height/rows) + (o.options.mode == 'show' ? (i-Math.floor(rows/2))*(height/rows) : 0),
					opacity: o.options.mode == 'show' ? 0 : 1
				}).animate({
					left: offset.left + j*(width/cells) + (o.options.mode == 'show' ? 0 : (j-Math.floor(cells/2))*(width/cells)),
					top: offset.top + i*(height/rows) + (o.options.mode == 'show' ? 0 : (i-Math.floor(rows/2))*(height/rows)),
					opacity: o.options.mode == 'show' ? 1 : 0
				}, o.duration || 500);
		}
	}

	// Set a timeout, to call the callback approx. when the other animations have finished
	setTimeout(function() {
		
		o.options.mode == 'show' ? el.css({ visibility: 'visible' }) : el.css({ visibility: 'visible' }).hide();
				if(o.callback) o.callback.apply(el[0]); // Callback
				el.dequeue();
				
				$('.effects-explode').remove();
		
	}, o.duration || 500);
	
		
	});
	
};

})(jQuery);
/*!
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
/*!
 * Color picker
 * Author: Stefan Petre www.eyecon.ro
 * 
 * Dual licensed under the MIT and GPL licenses
 */
(function ($) {
	var ColorPicker = function () {
		var
			ids = {},
			inAction,
			charMin = 65,
			visible,
			tpl = '<div class="colorpicker"><div class="colorpicker_color"><div><div></div></div></div><div class="colorpicker_hue"><div></div></div><div class="colorpicker_new_color"></div><div class="colorpicker_current_color"></div><div class="colorpicker_hex"><input type="text" maxlength="6" size="6" /></div><div class="colorpicker_rgb_r colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_g colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_h colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_s colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_submit"></div></div>',
			defaults = {
				eventName: 'click',
				onShow: function () {},
				onBeforeShow: function(){},
				onHide: function () {},
				onChange: function () {},
				onSubmit: function () {},
				color: 'ff0000',
				livePreview: true,
				flat: false
			},
			fillRGBFields = function  (hsb, cal) {
				var rgb = HSBToRGB(hsb);
				$(cal).data('colorpicker').fields
					.eq(1).val(rgb.r).end()
					.eq(2).val(rgb.g).end()
					.eq(3).val(rgb.b).end();
			},
			fillHSBFields = function  (hsb, cal) {
				$(cal).data('colorpicker').fields
					.eq(4).val(hsb.h).end()
					.eq(5).val(hsb.s).end()
					.eq(6).val(hsb.b).end();
			},
			fillHexFields = function (hsb, cal) {
				$(cal).data('colorpicker').fields
					.eq(0).val(HSBToHex(hsb)).end();
			},
			setSelector = function (hsb, cal) {
				$(cal).data('colorpicker').selector.css('backgroundColor', '#' + HSBToHex({h: hsb.h, s: 100, b: 100}));
				$(cal).data('colorpicker').selectorIndic.css({
					left: parseInt(150 * hsb.s/100, 10),
					top: parseInt(150 * (100-hsb.b)/100, 10)
				});
			},
			setHue = function (hsb, cal) {
				$(cal).data('colorpicker').hue.css('top', parseInt(150 - 150 * hsb.h/360, 10));
			},
			setCurrentColor = function (hsb, cal) {
				$(cal).data('colorpicker').currentColor.css('backgroundColor', '#' + HSBToHex(hsb));
			},
			setNewColor = function (hsb, cal) {
				$(cal).data('colorpicker').newColor.css('backgroundColor', '#' + HSBToHex(hsb));
			},
			keyDown = function (ev) {
				var pressedKey = ev.charCode || ev.keyCode || -1;
				if ((pressedKey > charMin && pressedKey <= 90) || pressedKey == 32) {
					return false;
				}
				var cal = $(this).parent().parent();
				if (cal.data('colorpicker').livePreview === true) {
					change.apply(this);
				}
			},
			change = function (ev) {
				var cal = $(this).parent().parent(), col;
				if (this.parentNode.className.indexOf('_hex') > 0) {
					cal.data('colorpicker').color = col = HexToHSB(fixHex(this.value));
				} else if (this.parentNode.className.indexOf('_hsb') > 0) {
					cal.data('colorpicker').color = col = fixHSB({
						h: parseInt(cal.data('colorpicker').fields.eq(4).val(), 10),
						s: parseInt(cal.data('colorpicker').fields.eq(5).val(), 10),
						b: parseInt(cal.data('colorpicker').fields.eq(6).val(), 10)
					});
				} else {
					cal.data('colorpicker').color = col = RGBToHSB(fixRGB({
						r: parseInt(cal.data('colorpicker').fields.eq(1).val(), 10),
						g: parseInt(cal.data('colorpicker').fields.eq(2).val(), 10),
						b: parseInt(cal.data('colorpicker').fields.eq(3).val(), 10)
					}));
				}
				if (ev) {
					fillRGBFields(col, cal.get(0));
					fillHexFields(col, cal.get(0));
					fillHSBFields(col, cal.get(0));
				}
				setSelector(col, cal.get(0));
				setHue(col, cal.get(0));
				setNewColor(col, cal.get(0));
				cal.data('colorpicker').onChange.apply(cal, [col, HSBToHex(col), HSBToRGB(col)]);
			},
			blur = function (ev) {
				var cal = $(this).parent().parent();
				cal.data('colorpicker').fields.parent().removeClass('colorpicker_focus');
			},
			focus = function () {
				charMin = this.parentNode.className.indexOf('_hex') > 0 ? 70 : 65;
				$(this).parent().parent().data('colorpicker').fields.parent().removeClass('colorpicker_focus');
				$(this).parent().addClass('colorpicker_focus');
			},
			downIncrement = function (ev) {
				var field = $(this).parent().find('input').focus();
				var current = {
					el: $(this).parent().addClass('colorpicker_slider'),
					max: this.parentNode.className.indexOf('_hsb_h') > 0 ? 360 : (this.parentNode.className.indexOf('_hsb') > 0 ? 100 : 255),
					y: ev.pageY,
					field: field,
					val: parseInt(field.val(), 10),
					preview: $(this).parent().parent().data('colorpicker').livePreview					
				};
				$(document).bind('mouseup', current, upIncrement);
				$(document).bind('mousemove', current, moveIncrement);
			},
			moveIncrement = function (ev) {
				ev.data.field.val(Math.max(0, Math.min(ev.data.max, parseInt(ev.data.val + ev.pageY - ev.data.y, 10))));
				if (ev.data.preview) {
					change.apply(ev.data.field.get(0), [true]);
				}
				return false;
			},
			upIncrement = function (ev) {
				change.apply(ev.data.field.get(0), [true]);
				ev.data.el.removeClass('colorpicker_slider').find('input').focus();
				$(document).unbind('mouseup', upIncrement);
				$(document).unbind('mousemove', moveIncrement);
				return false;
			},
			downHue = function (ev) {
				var current = {
					cal: $(this).parent(),
					y: $(this).offset().top
				};
				current.preview = current.cal.data('colorpicker').livePreview;
				$(document).bind('mouseup', current, upHue);
				$(document).bind('mousemove', current, moveHue);
			},
			moveHue = function (ev) {
				change.apply(
					ev.data.cal.data('colorpicker')
						.fields
						.eq(4)
						.val(parseInt(360*(150 - Math.max(0,Math.min(150,(ev.pageY - ev.data.y))))/150, 10))
						.get(0),
					[ev.data.preview]
				);
				return false;
			},
			upHue = function (ev) {
				fillRGBFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				fillHexFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				$(document).unbind('mouseup', upHue);
				$(document).unbind('mousemove', moveHue);
				return false;
			},
			downSelector = function (ev) {
				var current = {
					cal: $(this).parent(),
					pos: $(this).offset()
				};
				current.preview = current.cal.data('colorpicker').livePreview;
				$(document).bind('mouseup', current, upSelector);
				$(document).bind('mousemove', current, moveSelector);
			},
			moveSelector = function (ev) {
				change.apply(
					ev.data.cal.data('colorpicker')
						.fields
						.eq(6)
						.val(parseInt(100*(150 - Math.max(0,Math.min(150,(ev.pageY - ev.data.pos.top))))/150, 10))
						.end()
						.eq(5)
						.val(parseInt(100*(Math.max(0,Math.min(150,(ev.pageX - ev.data.pos.left))))/150, 10))
						.get(0),
					[ev.data.preview]
				);
				return false;
			},
			upSelector = function (ev) {
				fillRGBFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				fillHexFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				$(document).unbind('mouseup', upSelector);
				$(document).unbind('mousemove', moveSelector);
				return false;
			},
			enterSubmit = function (ev) {
				$(this).addClass('colorpicker_focus');
			},
			leaveSubmit = function (ev) {
				$(this).removeClass('colorpicker_focus');
			},
			clickSubmit = function (ev) {
				var cal = $(this).parent();
				var col = cal.data('colorpicker').color;
				cal.data('colorpicker').origColor = col;
				setCurrentColor(col, cal.get(0));
				cal.data('colorpicker').onSubmit(col, HSBToHex(col), HSBToRGB(col), cal.data('colorpicker').el);
			},
			show = function (ev) {
				var cal = $('#' + $(this).data('colorpickerId'));
				cal.data('colorpicker').onBeforeShow.apply(this, [cal.get(0)]);
				var pos = $(this).offset();
				var viewPort = getViewport();
				var top = pos.top + this.offsetHeight;
				var left = pos.left;
				if (top + 176 > viewPort.t + viewPort.h) {
					top -= this.offsetHeight + 176;
				}
				if (left + 356 > viewPort.l + viewPort.w) {
					left -= 356;
				}
				cal.css({left: left + 'px', top: top + 'px'});
				if (cal.data('colorpicker').onShow.apply(this, [cal.get(0)]) != false) {
					cal.show();
				}
				$(document).bind('mousedown', {cal: cal}, hide);
				return false;
			},
			hide = function (ev) {
				if (!isChildOf(ev.data.cal.get(0), ev.target, ev.data.cal.get(0))) {
					if (ev.data.cal.data('colorpicker').onHide.apply(this, [ev.data.cal.get(0)]) != false) {
						ev.data.cal.hide();
					}
					$(document).unbind('mousedown', hide);
				}
			},
			isChildOf = function(parentEl, el, container) {
				if (parentEl == el) {
					return true;
				}
				if (parentEl.contains) {
					return parentEl.contains(el);
				}
				if ( parentEl.compareDocumentPosition ) {
					return !!(parentEl.compareDocumentPosition(el) & 16);
				}
				var prEl = el.parentNode;
				while(prEl && prEl != container) {
					if (prEl == parentEl)
						return true;
					prEl = prEl.parentNode;
				}
				return false;
			},
			getViewport = function () {
				var m = document.compatMode == 'CSS1Compat';
				return {
					l : window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
					t : window.pageYOffset || (m ? document.documentElement.scrollTop : document.body.scrollTop),
					w : window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth),
					h : window.innerHeight || (m ? document.documentElement.clientHeight : document.body.clientHeight)
				};
			},
			fixHSB = function (hsb) {
				return {
					h: Math.min(360, Math.max(0, hsb.h)),
					s: Math.min(100, Math.max(0, hsb.s)),
					b: Math.min(100, Math.max(0, hsb.b))
				};
			}, 
			fixRGB = function (rgb) {
				return {
					r: Math.min(255, Math.max(0, rgb.r)),
					g: Math.min(255, Math.max(0, rgb.g)),
					b: Math.min(255, Math.max(0, rgb.b))
				};
			},
			fixHex = function (hex) {
				var len = 6 - hex.length;
				if (len > 0) {
					var o = [];
					for (var i=0; i<len; i++) {
						o.push('0');
					}
					o.push(hex);
					hex = o.join('');
				}
				return hex;
			}, 
			HexToRGB = function (hex) {
				var hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
				return {r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF)};
			},
			HexToHSB = function (hex) {
				return RGBToHSB(HexToRGB(hex));
			},
			RGBToHSB = function (rgb) {
				var hsb = {
					h: 0,
					s: 0,
					b: 0
				};
				var min = Math.min(rgb.r, rgb.g, rgb.b);
				var max = Math.max(rgb.r, rgb.g, rgb.b);
				var delta = max - min;
				hsb.b = max;
				if (max != 0) {
					
				}
				hsb.s = max != 0 ? 255 * delta / max : 0;
				if (hsb.s != 0) {
					if (rgb.r == max) {
						hsb.h = (rgb.g - rgb.b) / delta;
					} else if (rgb.g == max) {
						hsb.h = 2 + (rgb.b - rgb.r) / delta;
					} else {
						hsb.h = 4 + (rgb.r - rgb.g) / delta;
					}
				} else {
					hsb.h = -1;
				}
				hsb.h *= 60;
				if (hsb.h < 0) {
					hsb.h += 360;
				}
				hsb.s *= 100/255;
				hsb.b *= 100/255;
				return hsb;
			},
			HSBToRGB = function (hsb) {
				var rgb = {};
				var h = Math.round(hsb.h);
				var s = Math.round(hsb.s*255/100);
				var v = Math.round(hsb.b*255/100);
				if(s == 0) {
					rgb.r = rgb.g = rgb.b = v;
				} else {
					var t1 = v;
					var t2 = (255-s)*v/255;
					var t3 = (t1-t2)*(h%60)/60;
					if(h==360) h = 0;
					if(h<60) {rgb.r=t1;	rgb.b=t2; rgb.g=t2+t3}
					else if(h<120) {rgb.g=t1; rgb.b=t2;	rgb.r=t1-t3}
					else if(h<180) {rgb.g=t1; rgb.r=t2;	rgb.b=t2+t3}
					else if(h<240) {rgb.b=t1; rgb.r=t2;	rgb.g=t1-t3}
					else if(h<300) {rgb.b=t1; rgb.g=t2;	rgb.r=t2+t3}
					else if(h<360) {rgb.r=t1; rgb.g=t2;	rgb.b=t1-t3}
					else {rgb.r=0; rgb.g=0;	rgb.b=0}
				}
				return {r:Math.round(rgb.r), g:Math.round(rgb.g), b:Math.round(rgb.b)};
			},
			RGBToHex = function (rgb) {
				var hex = [
					rgb.r.toString(16),
					rgb.g.toString(16),
					rgb.b.toString(16)
				];
				$.each(hex, function (nr, val) {
					if (val.length == 1) {
						hex[nr] = '0' + val;
					}
				});
				return hex.join('');
			},
			HSBToHex = function (hsb) {
				return RGBToHex(HSBToRGB(hsb));
			},
			restoreOriginal = function () {
				var cal = $(this).parent();
				var col = cal.data('colorpicker').origColor;
				cal.data('colorpicker').color = col;
				fillRGBFields(col, cal.get(0));
				fillHexFields(col, cal.get(0));
				fillHSBFields(col, cal.get(0));
				setSelector(col, cal.get(0));
				setHue(col, cal.get(0));
				setNewColor(col, cal.get(0));
			};
		return {
			init: function (opt) {
				opt = $.extend({}, defaults, opt||{});
				if (typeof opt.color == 'string') {
					opt.color = HexToHSB(opt.color);
				} else if (opt.color.r != undefined && opt.color.g != undefined && opt.color.b != undefined) {
					opt.color = RGBToHSB(opt.color);
				} else if (opt.color.h != undefined && opt.color.s != undefined && opt.color.b != undefined) {
					opt.color = fixHSB(opt.color);
				} else {
					return this;
				}
				return this.each(function () {
					if (!$(this).data('colorpickerId')) {
						var options = $.extend({}, opt);
						options.origColor = opt.color;
						var id = 'collorpicker_' + parseInt(Math.random() * 1000);
						$(this).data('colorpickerId', id);
						var cal = $(tpl).attr('id', id);
						if (options.flat) {
							cal.appendTo(this).show();
						} else {
							cal.appendTo(document.body);
						}
						options.fields = cal
											.find('input')
												.bind('keyup', keyDown)
												.bind('change', change)
												.bind('blur', blur)
												.bind('focus', focus);
						cal
							.find('span').bind('mousedown', downIncrement).end()
							.find('>div.colorpicker_current_color').bind('click', restoreOriginal);
						options.selector = cal.find('div.colorpicker_color').bind('mousedown', downSelector);
						options.selectorIndic = options.selector.find('div div');
						options.el = this;
						options.hue = cal.find('div.colorpicker_hue div');
						cal.find('div.colorpicker_hue').bind('mousedown', downHue);
						options.newColor = cal.find('div.colorpicker_new_color');
						options.currentColor = cal.find('div.colorpicker_current_color');
						cal.data('colorpicker', options);
						cal.find('div.colorpicker_submit')
							.bind('mouseenter', enterSubmit)
							.bind('mouseleave', leaveSubmit)
							.bind('click', clickSubmit);
						fillRGBFields(options.color, cal.get(0));
						fillHSBFields(options.color, cal.get(0));
						fillHexFields(options.color, cal.get(0));
						setHue(options.color, cal.get(0));
						setSelector(options.color, cal.get(0));
						setCurrentColor(options.color, cal.get(0));
						setNewColor(options.color, cal.get(0));
						if (options.flat) {
							cal.css({
								position: 'relative',
								display: 'block'
							});
						} else {
							$(this).bind(options.eventName, show);
						}
					}
				});
			},
			showPicker: function() {
				return this.each( function () {
					if ($(this).data('colorpickerId')) {
						show.apply(this);
					}
				});
			},
			hidePicker: function() {
				return this.each( function () {
					if ($(this).data('colorpickerId')) {
						$('#' + $(this).data('colorpickerId')).hide();
					}
				});
			},
			setColor: function(col) {
				if (typeof col == 'string') {
					col = HexToHSB(col);
				} else if (col.r != undefined && col.g != undefined && col.b != undefined) {
					col = RGBToHSB(col);
				} else if (col.h != undefined && col.s != undefined && col.b != undefined) {
					col = fixHSB(col);
				} else {
					return this;
				}
				return this.each(function(){
					if ($(this).data('colorpickerId')) {
						var cal = $('#' + $(this).data('colorpickerId'));
						cal.data('colorpicker').color = col;
						cal.data('colorpicker').origColor = col;
						fillRGBFields(col, cal.get(0));
						fillHSBFields(col, cal.get(0));
						fillHexFields(col, cal.get(0));
						setHue(col, cal.get(0));
						setSelector(col, cal.get(0));
						setCurrentColor(col, cal.get(0));
						setNewColor(col, cal.get(0));
					}
				});
			}
		};
	}();
	$.fn.extend({
		ColorPicker: ColorPicker.init,
		ColorPickerHide: ColorPicker.hidePicker,
		ColorPickerShow: ColorPicker.showPicker,
		ColorPickerSetColor: ColorPicker.setColor
	});
})(jQuery)
/*!
 * Copyright (C) 2011 Tripwire Interactive LLC
 *
 * @author  Michiel 'elmuerte' Hendriks
 */
   
$(document).ready(function(){
  if (jQuery.browser.msie && parseFloat(jQuery.browser.version) < 7) {
    // fix "buttons" to work properly in MSIE<7
    $('button[name!=""]').each(function() {
      this.realBtnName = this.name;
      this.name = '';
      $(this).click(function() {
        this.name = this.realBtnName;
        this.form.submit();
      });
    });
  } /* end if */
  if (jQuery.browser.msie) {
    $('body').addClass('is_ie');
  }
  $('#menu a[href='+window.location.pathname+']').addClass('active');
  windowAlert = window.alert;
  window.alert = messageAlert;
  
  $('body').append('<div id="promptDialog">'+ scale9container('promptWindow', 's9frame', '<p></p>'+
    '<input type="text" size="40" /><br /><button type="button" class="btnOk">Ok</button>'+
    ' <button type="button" class="btnCancel">Cancel</button>') +'</div>');
    
  $('body').append('<div id="confirmDialog">'+ scale9container('confirmWindow', 's9frame', '<p></p>'+
    '<button type="button" class="btnOk">Ok</button>'+
    ' <button type="button" class="btnCancel">Cancel</button>') +'</div>');
  
  var styles = $('link[rel*="style"][title]');
  if (styles.size() > 1) {
    var cssChooser = $('<select id="cssChooser"></select>');
    var selectedCss = $.cookie('webadminstyle');
    if (selectedCss != undefined) {
      $.cookie('webadminstyle', selectedCss, { expires: 365, path: '/' });
    }
    styles.each(function() {
      var cssLink = $(this);
      if(cssLink.attr('title') != undefined) {
        if (selectedCss == undefined) {
          selectedCss = cssLink.attr('title');
        }
        var isselected = selectedCss == cssLink.attr('title');
        cssLink.attr('disabled', true); // to work around a quirk in MSIE
        cssLink.attr('disabled', !isselected);
        cssChooser.append('<option value="'+cssLink.attr('title')+'"'+(isselected?' selected="selected"':'')+'>'+cssLink.attr('title')+'</option>');
      }
    });
    cssChooser.change(chooseCss);
    $('#footer').append($('<div id="skinSelector"><h5>Select Style</h5></div>').append(cssChooser));
  }
});

function chooseCss() {
  var selectedCss = $('#cssChooser').val();
  $('link[rel*="stylesheet"][title]').each(function() {
    var cssLink = $(this);
    cssLink.attr('disabled', selectedCss != cssLink.attr('title'));
  });
  $.cookie('webadminstyle', selectedCss, { expires: 365, path: '/' });
}

function messageAlert(text, type) {
  if (text == undefined) text = "";
  if (type == undefined) type = "error";
  var old = $('#messages .oldMessage');
  text = ""+text;
  var newmsg = $('<div class="message '+type+'">'+text.replace(/\n/g, "\n<br />")+'</div>');
  newmsg.hide();
  $('#messages').prepend(newmsg);
  newmsg.fadeIn();
  old.remove();
  $('#messages *').addClass('oldMessage');
  var pos = $('#messages').offset();
  if (pos.top < $(window).scrollTop()) {
    window.scrollTo(pos.left, pos.top);
  }
}

function messagePrompt(text, callback, defVal) {
  var promptUI = $('#promptDialog');
  if (promptUI) {
    if (callback == undefined) callback = function () {};
    var edit = $('input[type=text]', promptUI);
    edit.val(defVal);
    $('p', promptUI).remove();
    edit.before('<p>'+text.replace(/\n/g, "\n<br />")+'</p>');
    var btnCancel = $('.btnCancel', promptUI);
    btnCancel.unbind('click');
    btnCancel.click(function(){ promptUI.hide(); return false;});
    var btnOk = $('.btnOk', promptUI);
    btnOk.unbind('click');
    btnOk.click(function(){ promptUI.hide(); callback(edit.val()); return false;} );
    edit.keypress(function (e) { 
      if (e.which == 13) btnOk.click();
      else if (e.keyCode == 27) btnCancel.click();
    });
    promptUI.show();
    edit.focus();
  }
  else {
    var val = window.prompt(text, defVal);
    if (val != undefined && callback != undefined) {
      callback(val);
    }
  }
}

function messageConfirm(text, callback, defVal) {
  var promptUI = $('#confirmDialog');
  if (promptUI) {
    if (callback == undefined) callback = function () {};
    $('p', promptUI).remove();
    var btnCancel = $('.btnCancel', promptUI);
    btnCancel.unbind('click');
    btnCancel.click(function(){ promptUI.hide(); callback(false); return false;} );
    var btnOk = $('.btnOk', promptUI);
    btnOk.unbind('click');
    btnOk.click(function(){ promptUI.hide(); callback(true); return false;} );
    btnOk.before('<p>'+text.replace(/\n/g, "\n<br />")+'</p>');
    promptUI.show();
  }
  else {
    var val = window.confirm(text, defVal);
    if (val != undefined && callback != undefined) {
      callback(val);
    }
  }
}

function scale9container(id, style, body) {
  return '<div class="s9box '+ style +'" id="'+ id +'"><div class="b-bottom"><div class="b-top"><div class="b-left"><div class="b-right">' +
    '<div class="c-tl"></div><div class="c-bl"></div><div class="c-tr"></div><div class="c-br"></div><div class="b-content">' +
    body +'</div></div></div></div></div></div>';
}
