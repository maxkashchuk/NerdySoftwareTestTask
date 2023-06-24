using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NerdySoftwareTestTask.Models;
using NerdySoftwareTestTask.Models.ControllerModels;
using NerdySoftwareTestTask.Services;

namespace NerdySoftwareTestTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnouncmentController : ControllerBase
    {
        private readonly IAnnouncmentService _announcmentService;

        public AnnouncmentController(IAnnouncmentService _announcmentService)
        {
            this._announcmentService = _announcmentService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddAnnouncment(AddAnnouncment announcment)
        {
            Announcment a = await _announcmentService.AddAnnouncment(announcment);
            if (a != null)
            {
                return Created("add", a);
            }
            return BadRequest();
        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditAnnouncment(Announcment announcment)
        {
            if(await _announcmentService.EditAnnouncment(announcment))
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> DeleteAnnouncment(int id)
        {
            if(await _announcmentService.DeleteAnnouncment(id))
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllAnnouncments()
        {
            ICollection<Announcment> announcments = await _announcmentService.GetAllAnnouncments();
            if (announcments == null)
            {
                return BadRequest();
            }
            return Ok(announcments);
        }

        [HttpGet("get/{id:int}")]
        public async Task<IActionResult> GetAnnouncment(int id)
        {
            GetAnnouncment announcment = await _announcmentService.GetAnnouncment(id);
            if(announcment == null)
            {
                return BadRequest();
            }
            return Ok(announcment);
        }
    }
}
