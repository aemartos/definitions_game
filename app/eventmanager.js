


export default function init_events(){
	var start_button = $('#start_button');
	var game = $('.main_game');
	var initial_text = $('.main_text');
	var initial_controls = $('.control_text');
	var game_controls = $('.controls_menu');
	var game_controls_mob = $('.controls_menu_mob');
	var game_score = $('.progress_score');


	var startGame = function(){
		initial_text.addClass('hide');
		game.removeClass('hide');
		initial_controls.addClass('hide');
		game_controls.removeClass('hide');
		game_controls_mob.removeClass('hide');
		game_score.removeClass('hide');
	};


	start_button.on('click', startGame);


};