<!-- Cancel Modal -->
<div class="modal fade bs-cancel-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalCancel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalCancel">Cancel Evaluation</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>cancel</b> this evaluation. Would you like to continue?
      </div>
      <div class="modal-footer modal-cancel">
    <form method="post" action="/evaluation/cancel">
		{!! csrf_field() !!}
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-danger" id="id" name="id" value="">Confirm</button>
        </form>
      </div>
    </div>
  </div>
</div>
